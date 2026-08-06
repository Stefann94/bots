import { useState } from 'react'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate network request
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      
      // Hide toast after 3s
      setTimeout(() => setSuccess(false), 3000)
    }, 1500)
  }

  return (
    <>
      <section id="about" className="py-24 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyber-cyan/40 shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

                  <div className="text-center mb-8">
                      <span className="text-xs font-mono text-cyber-cyan uppercase tracking-widest">ACHIZIȚII ENTERPRISE</span>
                      <h2 className="text-3xl font-bold text-white mt-2">Programează o Demonstrație Live</h2>
                      <p className="text-slate-400 text-sm mt-2">
                          Testează modelele humanoide Unitree și AgiBot la sediul tău sau vizitează hub-urile noastre tehnologice regionale.
                      </p>
                  </div>

                  <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-mono text-slate-300 mb-1">Nume Complet *</label>
                              <input type="text" required placeholder="Dr. Alexander Vance" className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyber-cyan transition-colors" />
                          </div>
                          <div>
                              <label className="block text-xs font-mono text-slate-300 mb-1">Email Corporate *</label>
                              <input type="email" required placeholder="a.vance@enterprise.ro" className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyber-cyan transition-colors" />
                          </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                              <label className="block text-xs font-mono text-slate-300 mb-1">Model de Interes Principal</label>
                              <select className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyber-cyan transition-colors">
                                  <option>Unitree H1 Bipedal</option>
                                  <option>Unitree G1 Compact</option>
                                  <option>AgiBot Raise A1 / A2</option>
                                  <option>Platformă de Cercetare Custom</option>
                              </select>
                          </div>
                          <div>
                              <label className="block text-xs font-mono text-slate-300 mb-1">Timeline Implementare</label>
                              <select className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyber-cyan transition-colors">
                                  <option>Imediat (Q1 2026)</option>
                                  <option>3-6 Luni</option>
                                  <option>Fază de Cercetare & Evaluare</option>
                              </select>
                          </div>
                      </div>

                      <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Detalii Proiect & Cerințe Implementare</label>
                          <textarea rows="4" placeholder="Specifică mediul, nevoile de payload, integrările software..." className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyber-cyan transition-colors"></textarea>
                      </div>

                      <button type="submit" disabled={loading} className="w-full py-4 bg-cyber-cyan text-navy-950 font-mono font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all flex justify-center items-center">
                          {loading ? <i className="fa-solid fa-spinner fa-spin text-xl"></i> : 'Trimite Solicitare Enterprise'}
                      </button>
                  </form>
              </div>
          </div>
      </section>

      {/* Notification Toast */}
      <div className={`fixed bottom-6 right-6 z-50 glass-card border border-cyber-cyan text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 ${success ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <i className="fa-solid fa-circle-check text-cyber-cyan text-xl"></i>
          <div>
              <div className="font-bold text-sm">Cerere Trimisă</div>
              <div className="text-xs text-slate-400">Echipa noastră te va contacta curând.</div>
          </div>
      </div>
    </>
  )
}
