export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold tracking-tight text-white mb-2">
              Shaale<span className="text-orange-500">-Vikas</span>
            </span>
            <p className="text-sm max-w-xs text-center md:text-left">
              Building a transparent bridge between rural schools and their global alumni support system.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Admin Login</a>
          </div>
          
          <div className="text-xs">
            © 2024 Shaale-Vikas Initiative. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
