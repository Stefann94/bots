import { useState, useRef, useEffect } from 'react'

export default function CustomVideoPlayer({ src }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration
    setProgress((current / total) * 100)
    setCurrentTime(formatTime(current))
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(formatTime(videoRef.current.duration))
  }

  const handleSeek = (e) => {
    if (!videoRef.current) return
    const seekTime = (e.target.value / 100) * videoRef.current.duration
    videoRef.current.currentTime = seekTime
    setProgress(e.target.value)
  }

  const handleVolumeChange = (e) => {
    if (!videoRef.current) return
    const newVolume = parseFloat(e.target.value)
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
      videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      videoRef.current.muted = false
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    if (isMuted) {
      videoRef.current.muted = false
      setIsMuted(false)
      if (volume === 0) {
        setVolume(1)
        videoRef.current.volume = 1
      }
    } else {
      videoRef.current.muted = true
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full group bg-black rounded-2xl overflow-hidden flex items-center justify-center shadow-inner"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        playsInline
      />

      {/* Large Center Play Button */}
      {!isPlaying && (
        <button 
          onClick={togglePlay}
          className="absolute inset-0 m-auto w-20 h-20 bg-[#020617]/50 backdrop-blur-md rounded-full flex items-center justify-center text-cyber-cyan border border-cyber-cyan/30 hover:bg-cyber-cyan/20 hover:scale-110 transition-all z-10 shadow-[0_0_30px_rgba(0,240,255,0.2)]"
        >
          <i className="fa-solid fa-play text-3xl ml-2"></i>
        </button>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-4 px-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-3">
          <span className="text-slate-300 text-xs font-mono w-10 text-right">{currentTime}</span>
          <div className="relative flex-1 h-1.5 bg-slate-700/50 rounded-full group/slider cursor-pointer">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress || 0} 
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div 
              className="absolute top-0 left-0 h-full bg-cyber-cyan rounded-full pointer-events-none"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_10px_rgba(0,240,255,1)] opacity-0 group-hover/slider:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-slate-300 text-xs font-mono w-10">{duration}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white hover:text-cyber-cyan transition-colors w-8 h-8 flex items-center justify-center focus:outline-none">
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl`}></i>
            </button>
            <div className="flex items-center group/volume">
              <button onClick={toggleMute} className="text-white hover:text-cyber-cyan transition-colors w-8 h-8 flex items-center justify-center focus:outline-none z-10">
                <i className={`fa-solid ${isMuted || volume === 0 ? 'fa-volume-xmark' : volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'} text-xl`}></i>
              </button>
              
              <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-out flex items-center opacity-0 group-hover/volume:opacity-100 ml-1">
                <div className="relative w-full h-1.5 bg-slate-700/50 rounded-full group/vol-slider cursor-pointer">
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01"
                    value={isMuted ? 0 : volume} 
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-cyber-cyan rounded-full pointer-events-none"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,240,255,1)] opacity-0 group-hover/vol-slider:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button onClick={toggleFullscreen} className="text-white hover:text-cyber-cyan transition-colors w-8 h-8 flex items-center justify-center focus:outline-none">
            <i className="fa-solid fa-expand text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
