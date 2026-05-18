import { School, User, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="h-20 px-8 flex items-center justify-between border-b border-natural-line bg-natural-bg sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <motion.div 
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          className="w-10 h-10 bg-natural-green rounded-xl flex items-center justify-center"
        >
          <School className="w-6 h-6 text-white" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-serif font-bold text-natural-green leading-tight">Shaale-Vikas</h1>
          <p className="text-[10px] text-natural-muted uppercase tracking-widest font-bold">Bridge to Rural Excellence</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-natural-ink">{user?.displayName || 'Alumni Friend'}</p>
          <p className="text-[10px] text-natural-muted uppercase font-bold tracking-tighter truncate max-w-[150px]">
            {user?.email}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-natural-tan p-0.5">
            <div className="w-full h-full rounded-full bg-natural-line flex items-center justify-center">
              <User className="w-5 h-5 text-natural-muted" />
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 text-natural-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
