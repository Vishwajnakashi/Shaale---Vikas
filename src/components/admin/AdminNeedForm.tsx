import { useState } from 'react';
import { Sparkles, Loader2, Send } from 'lucide-react';

interface AdminNeedFormProps {
  onClose: () => void;
  onSubmit: (need: any) => void;
}

export default function AdminNeedForm({ onClose, onSubmit }: AdminNeedFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    costEstimate: '',
    details: '',
    description: ''
  });

  const handleAIEnhance = async () => {
    if (!formData.title || !formData.details) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/describe-need', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: formData.title, details: formData.details })
      });
      const data = await res.json();
      setFormData(prev => ({ ...prev, description: data.description }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-natural-green/20 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[32px] p-10 shadow-2xl border border-natural-line">
        <h3 className="text-3xl font-serif font-bold text-natural-ink mb-2">List a New School Need</h3>
        <p className="text-sm text-natural-muted mb-8 italic">Specify the requirement to help alumni identify how they can help.</p>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Need Title</label>
            <input 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Computer Lab Fans"
              className="w-full px-5 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all placeholder:text-natural-line bg-natural-bg/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all appearance-none bg-natural-bg/30"
              >
                <option>Infrastructure</option>
                <option>Books</option>
                <option>Water</option>
                <option>Sports</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Cost Estimate (₹)</label>
              <input 
                type="number"
                value={formData.costEstimate}
                onChange={e => setFormData({...formData, costEstimate: e.target.value})}
                placeholder="5000"
                className="w-full px-5 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all placeholder:text-natural-line bg-natural-bg/30"
              />
            </div>
          </div>

          <div>
             <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest block">Rough Details</label>
                <button 
                  onClick={handleAIEnhance}
                  disabled={loading || !formData.title || !formData.details}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-natural-green hover:text-natural-tan transition-colors uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  Generate AI Description
                </button>
             </div>
             <textarea 
               value={formData.details}
               onChange={e => setFormData({...formData, details: e.target.value})}
               placeholder="Need 5 sets of paints for the wall..."
               className="w-full px-5 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all h-24 placeholder:text-natural-line bg-natural-bg/30"
             />
          </div>

          {formData.description && (
             <div className="animate-in fade-in slide-in-from-top-2">
                <label className="text-[10px] font-bold text-natural-green uppercase tracking-widest mb-2 block">Compelling Description (AI Enhanced)</label>
                <p className="p-5 bg-natural-sidebar rounded-2xl border border-natural-line text-natural-ink text-sm leading-relaxed italic">
                   "{formData.description}"
                </p>
             </div>
          )}
        </div>

        <div className="flex gap-4 mt-10">
          <button 
            onClick={onClose}
            className="flex-1 py-4 text-natural-muted font-bold hover:bg-natural-sidebar rounded-2xl transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={() => onSubmit(formData)}
            className="flex-1 py-4 bg-natural-green text-white font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-natural-green/20"
          >
            <Send className="w-4 h-4" />
            <span>List the Need</span>
          </button>
        </div>
      </div>
    </div>
  );
}
