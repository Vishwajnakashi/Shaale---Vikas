import { LayoutDashboard, Image, Trophy, IndianRupee, Globe } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentView: 'hub' | 'school';
  onViewChange: (view: 'hub' | 'school') => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-natural-line bg-natural-sidebar flex flex-col p-6 sticky top-20 h-[calc(100vh-80px)]">
      <div className="space-y-2">
        <button 
          onClick={() => onViewChange('hub')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left",
            currentView === 'hub' ? "bg-[#E6E9DF] text-natural-green" : "text-natural-muted hover:bg-white/50"
          )}
        >
          <Globe className="w-5 h-5" />
          Impact Hub
        </button>
        <button 
          onClick={() => onViewChange('school')}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left",
            currentView === 'school' ? "bg-[#E6E9DF] text-natural-green" : "text-natural-muted hover:bg-white/50"
          )}
        >
          <LayoutDashboard className="w-5 h-5" />
          Priority Needs
        </button>
        <div className="flex items-center gap-3 px-4 py-3 text-natural-muted hover:bg-white/50 rounded-xl font-medium transition-colors cursor-pointer">
          <Image className="w-5 h-5" />
          Impact Photos
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-natural-muted hover:bg-white/50 rounded-xl font-medium transition-colors cursor-pointer">
          <Trophy className="w-5 h-5" />
          Hall of Fame
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="bg-natural-green rounded-2xl p-5 text-white shadow-lg shadow-natural-green/20">
          <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold mb-1">Total Pledged</p>
          <h3 className="text-2xl font-serif font-bold flex items-center">
            <IndianRupee className="w-5 h-5 mr-1" />
            2,45,000
          </h3>
          <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-natural-tan"></div>
          </div>
          <p className="text-[10px] mt-2 opacity-80 font-medium tracking-tight">75% of Yearly Goal reached</p>
        </div>
      </div>
    </aside>
  );
}
