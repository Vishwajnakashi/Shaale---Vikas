/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { School, Users, CheckCircle, ArrowRight, Sparkles, Plus, Settings, Heart, Image, Loader2 } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import NeedCard from './components/needs/NeedCard';
import AdminNeedForm from './components/admin/AdminNeedForm';
import AuthPage from './components/auth/AuthPage';
import SchoolHub from './components/hub/SchoolHub';
import { Need } from './types';
import { schoolService } from './services/schoolService';
import { cn } from './lib/utils';

// Mock Data as fallback
const INITIAL_NEEDS: Need[] = [
  {
    id: '1',
    schoolId: 's1',
    title: 'Main Block Roof Leakage',
    description: 'Water seepage affecting Grade 4 and 5 classrooms during rain.',
    category: 'Infrastructure',
    costEstimate: 18500,
    collectedAmount: 11100,
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    schoolId: 's1',
    title: 'Kannada Storybooks Set',
    description: 'Set of 25 illustrated storybooks for the school library.',
    category: 'Books',
    costEstimate: 4200,
    collectedAmount: 0,
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    schoolId: 's1',
    title: 'RO Drinking Water Filter',
    description: 'Fulfillment: Pledged by Batch of 1998.',
    category: 'Infrastructure',
    costEstimate: 12000,
    collectedAmount: 12000,
    status: 'Fulfilled',
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [needs, setNeeds] = useState<Need[]>(INITIAL_NEEDS);
  const [pledgingIdx, setPledgingIdx] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [view, setView] = useState<'hub' | 'school'>('hub');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    const unsubscribeNeeds = schoolService.subscribeToNeeds((syncedNeeds) => {
      if (syncedNeeds.length > 0) {
        setNeeds(syncedNeeds);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeNeeds();
    };
  }, []);

  const handlePledge = async (needId: string) => {
    if (!user) return;
    setPledgingIdx(needId);
    try {
      await schoolService.pledgeSupport(needId, 500, user.displayName || 'Anonymous Alumni', user.uid);
    } catch (e) {
      setNeeds(prev => prev.map(n => n.id === needId ? { ...n, collectedAmount: Math.min(n.costEstimate, n.collectedAmount + 500) } : n));
    } finally {
      setTimeout(() => setPledgingIdx(null), 1000);
    }
  };

  const handleCreateNeed = async (formData: any) => {
    try {
      await schoolService.createNeed({
        schoolId: 's1',
        title: formData.title,
        description: formData.description || formData.details,
        category: formData.category,
        costEstimate: Number(formData.costEstimate),
      });
      setShowAdminForm(false);
    } catch (e) {
      const newNeed: Need = {
        id: Math.random().toString(),
        schoolId: 's1',
        title: formData.title,
        description: formData.description || formData.details,
        category: formData.category,
        costEstimate: Number(formData.costEstimate),
        collectedAmount: 0,
        status: 'Open',
        createdAt: new Date().toISOString(),
      };
      setNeeds([newNeed, ...needs]);
      setShowAdminForm(false);
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-natural-bg flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-natural-green animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    if (view === 'hub') {
      return (
        <SchoolHub 
          onSelectSchool={(id) => {
            setSelectedSchoolId(id);
            setView('school');
          }}
          onFilterCategory={(cat) => {
            setCategoryFilter(cat);
            setView('school');
          }}
        />
      );
    }

    // Filter needs based on category if coming from hub filter
    const filteredNeeds = categoryFilter 
      ? needs.filter(n => n.category === categoryFilter)
      : needs;

    return (
      <main className="flex-1 p-8 grid lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Main Needs Section */}
        <div className="lg:col-span-2 flex flex-col gap-8 overflow-hidden">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-serif font-bold text-natural-ink">
                {categoryFilter ? `${categoryFilter} Needs` : 'Priority Needs'}
              </h2>
              <p className="text-sm text-natural-muted">
                {categoryFilter 
                  ? `Showing all urgent ${categoryFilter.toLowerCase()} requirements.`
                  : "Help us bridge the infrastructure gap for 240 students."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {categoryFilter && (
                <button 
                  onClick={() => setCategoryFilter(null)}
                  className="text-xs font-bold text-natural-tan uppercase tracking-widest border-b border-natural-tan hover:text-natural-green hover:border-natural-green transition-all"
                >
                  Clear Filter
                </button>
              )}
              <button 
                onClick={() => setIsAdmin(!isAdmin)}
                className={cn(
                  "p-2.5 rounded-full transition-all border border-natural-line",
                  isAdmin ? "bg-natural-green text-white" : "bg-white text-natural-muted hover:bg-natural-sidebar"
                )}
                title="Toggle Admin Mode"
              >
                <Settings className="w-5 h-5" />
              </button>
              {isAdmin && (
                <button 
                  onClick={() => setShowAdminForm(true)}
                  className="px-5 py-2.5 bg-natural-tan text-white rounded-full font-semibold text-sm shadow-sm hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  List New Need
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[calc(100vh-250px)]">
            {filteredNeeds.map((need: Need) => (
              <div key={need.id}>
                <NeedCard need={need} onPledge={handlePledge} />
              </div>
            ))}
            {filteredNeeds.length === 0 && (
              <div className="flex flex-col items-center justify-center p-20 text-center bg-white border border-dashed border-natural-line rounded-[32px]">
                 <div className="w-16 h-16 bg-natural-sidebar rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-natural-muted" />
                 </div>
                 <h3 className="text-xl font-serif font-bold text-natural-ink">Great News!</h3>
                 <p className="text-sm text-natural-muted mt-2 uppercase tracking-widest font-bold">No Urgent {categoryFilter} Needs Currently</p>
              </div>
            )}
          </div>
        </div>

        {/* Side Panels */}
        <div className="hidden lg:flex flex-col gap-8">
          {/* Donor Hall of Fame */}
          <div className="bg-natural-sidebar border border-natural-line rounded-[32px] p-6 flex flex-col">
            <h3 className="text-lg font-serif font-bold text-natural-ink mb-4">Donor Hall of Fame</h3>
            <div className="space-y-4">
              {[
                { name: 'Dr. Anand K.', amount: 'RO Water Filter', date: '1w ago', seed: 'Anand' },
                { name: 'Meera Kulkarni', amount: '₹ 5,000', date: '2d ago', seed: 'Meera' },
                { name: 'Prakash Rao', amount: '5 Ceiling Fans', date: 'Yesterday', seed: 'Prakash' },
              ].map(( donor, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-natural-line shadow-inner flex items-center justify-center overflow-hidden">
                     <Users className="w-5 h-5 text-natural-muted" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{donor.name}</p>
                    <p className="text-[11px] text-natural-muted">Donated: {donor.amount}</p>
                  </div>
                  <span className="text-[10px] text-natural-green font-bold italic">{donor.date}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 text-sm font-bold text-natural-tan text-center w-full py-2 border border-dashed border-natural-tan rounded-xl hover:bg-natural-tan/5 transition-colors">
              View All Contributors
            </button>
          </div>

          {/* Impact Panel */}
          <div className="bg-white border border-natural-line rounded-[32px] p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-serif font-bold text-natural-ink mb-3">Latest Impact</h3>
            <div className="relative flex-1 rounded-2xl overflow-hidden mb-3 min-h-[160px]">
              <img 
                src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-full object-cover grayscale-[0.5]" 
                alt="Impact Photo" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded">AFTER</div>
            </div>
            <p className="text-sm font-bold">Compound Wall Restoration</p>
            <p className="text-[11px] text-natural-muted mt-1 italic leading-tight">
              "The students now feel safe and the school looks beautiful!" — HM S. Gowda
            </p>
          </div>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-natural-bg flex flex-col font-sans select-none overflow-x-hidden">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={view} onViewChange={setView} />

        {renderContent()}
      </div>

      <footer className="h-12 px-8 flex items-center justify-between border-t border-natural-line bg-natural-sidebar text-[11px] text-natural-muted font-medium">
        <div>Transparency Code: <span className="font-mono font-bold tracking-tight">SV-HUN-4492</span></div>
        <div className="flex gap-4">
          <span className="hidden sm:inline">Real-time Updates Powered by Firebase</span>
          <span className="flex items-center gap-1.5 font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div> 
            System Online
          </span>
        </div>
      </footer>

      <AnimatePresence>
        {showAdminForm && (
          <AdminNeedForm 
            onClose={() => setShowAdminForm(false)} 
            onSubmit={handleCreateNeed}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pledgingIdx && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-natural-green text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-4 border border-white/20 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-natural-tan animate-pulse" />
            <span className="font-medium text-sm">Recording your commitment to the school...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
