import { IndianRupee, School, ArrowRight, Droplets, BookOpen, Construction, Trophy, Search, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SchoolData {
  id: string;
  name: string;
  location: string;
  totalNeeds: number;
  activeImpact: string;
}

const SCHOOLS: SchoolData[] = [
  {
    id: 's1',
    name: 'Government Primary School, Hunsur',
    location: 'Mysuru District',
    totalNeeds: 12,
    activeImpact: 'RO Filter Installed'
  },
  {
    id: 's2',
    name: 'Kuvempu Memorial High School',
    location: 'Shivamogga',
    totalNeeds: 8,
    activeImpact: 'Library Restored'
  },
  {
    id: 's3',
    name: 'Rural Model School, Hubli',
    location: 'Dharwad',
    totalNeeds: 15,
    activeImpact: 'New Sports Kit'
  }
];

const CATEGORIES = [
  { id: 'Infrastructure', icon: Construction, label: 'Infrastructure', color: 'bg-orange-50 text-orange-700' },
  { id: 'Water', icon: Droplets, label: 'Water & Hygiene', color: 'bg-blue-50 text-blue-700' },
  { id: 'Books', icon: BookOpen, label: 'Books & Supplies', color: 'bg-green-50 text-green-700' },
  { id: 'Sports', icon: Trophy, label: 'Sports & PE', color: 'bg-purple-50 text-purple-700' },
];

interface SchoolHubProps {
  onSelectSchool: (schoolId: string) => void;
  onFilterCategory: (category: string) => void;
}

export default function SchoolHub({ onSelectSchool, onFilterCategory }: SchoolHubProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-natural-bg p-8 custom-scrollbar h-screen">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-natural-ink mb-2">Alumni Impact Hub</h1>
            <p className="text-natural-muted italic">Find your roots, choose your cause, and drive transformation.</p>
          </div>
          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-muted group-focus-within:text-natural-green transition-colors" />
            <input 
              placeholder="Search school by name or district..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-natural-line rounded-2xl outline-none focus:ring-2 focus:ring-natural-tan transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Global Categories */}
        <section>
          <div className="flex items-center gap-3 mb-6">
             <div className="h-px flex-1 bg-natural-line" />
             <h2 className="text-[10px] font-bold text-natural-muted uppercase tracking-[0.2em]">Explore by Need Category</h2>
             <div className="h-px flex-1 bg-natural-line" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ y: -4 }}
                onClick={() => onFilterCategory(cat.id)}
                className="bg-white border border-natural-line rounded-3xl p-6 flex flex-col items-center text-center transition-all hover:shadow-xl hover:shadow-natural-green/5 group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", cat.color)}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <span className="font-bold text-natural-ink">{cat.label}</span>
                <span className="text-[10px] text-natural-muted uppercase tracking-widest mt-1">Global Needs</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Schools List */}
        <section>
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-serif font-bold text-natural-ink">Partner Schools</h2>
             <button className="text-xs font-bold text-natural-tan uppercase tracking-widest border-b-2 border-natural-tan/20 hover:border-natural-tan pb-1 transition-all">View All 15+ Schools</button>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {SCHOOLS.map((school) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-natural-line rounded-[32px] overflow-hidden group hover:shadow-2xl hover:shadow-natural-green/10 transition-all flex flex-col"
              >
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif font-bold text-natural-ink group-hover:text-natural-green transition-colors">{school.name}</h3>
                    <div className="bg-natural-sidebar text-natural-muted text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-natural-line shrink-0">
                      <MapPin className="w-3 h-3" />
                      {school.location}
                    </div>
                  </div>
                  <p className="text-sm text-natural-muted mb-6 leading-relaxed italic">
                    Latest Impact: <span className="font-bold text-natural-green not-italic">"{school.activeImpact}"</span>
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-natural-line">
                    <div>
                      <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-1">Active Needs</p>
                      <p className="text-lg font-bold text-natural-ink">{school.totalNeeds} Items</p>
                    </div>
                    <button 
                      onClick={() => onSelectSchool(school.id)}
                      className="w-12 h-12 bg-natural-sidebar text-natural-green rounded-2xl flex items-center justify-center group-hover:bg-natural-green group-hover:text-white transition-all shadow-sm"
                    >
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Stats Callout */}
        <section className="bg-natural-green rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-natural-green/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-natural-tan/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10 grid md:grid-cols-3 gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-natural-tan mb-2">Total Transformation</p>
              <h4 className="text-3xl font-serif font-bold flex items-center">
                <IndianRupee className="w-6 h-6 mr-1" />
                8,45,000
              </h4>
              <p className="text-sm text-white/70 mt-2">Pledged across all rural schools this year.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-natural-tan mb-2">Network Strength</p>
              <h4 className="text-3xl font-serif font-bold">12,402</h4>
              <p className="text-sm text-white/70 mt-2">Verified alumni connected to their childhood schools.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-natural-tan mb-2">Direct Reach</p>
              <h4 className="text-3xl font-serif font-bold">45 Schools</h4>
              <p className="text-sm text-white/70 mt-2">Currently being supported by the Shaale-Vikas program.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
