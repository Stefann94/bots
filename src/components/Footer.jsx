export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
                
                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-navy-900 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <span className="font-bold text-white text-base">NEXUS<span className="text-cyber-cyan">BOTICS</span></span>
                    </div>
                    <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
                        Distribuitor Autorizat Global Enterprise & Platformă de Integrare pentru Sistemele Humanoide Unitree Robotics și AgiBot.
                    </p>
                    <div className="flex space-x-4 text-base">
                        <a href="#" className="hover:text-cyber-cyan transition-colors" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#" className="hover:text-cyber-cyan transition-colors" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" className="hover:text-cyber-cyan transition-colors" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        <a href="#" className="hover:text-cyber-cyan transition-colors" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase font-mono tracking-widest text-[10px]">Produse</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Unitree H1</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Unitree G1</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">AgiBot A2</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">AgiBot Raise</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase font-mono tracking-widest text-[10px]">Dezvoltatori</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">API Docs & SDK</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Simulare Isaac Gym</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Pachete ROS2</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Portal Suport</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4 uppercase font-mono tracking-widest text-[10px]">Companie</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Despre Noi</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Cariere</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Contact Press</a></li>
                        <li><a href="#" className="hover:text-cyber-cyan transition-colors">Termeni Legali</a></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; 2026 NexusBotics. Machetă interviu UI/UX. Toate drepturile rezervate.</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-server text-emerald-400"></i> SYSTEM ONLINE</span>
                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-shield-halved text-cyber-cyan"></i> SECURE ENCLAVE</span>
                </div>
            </div>
        </div>
    </footer>
  )
}
