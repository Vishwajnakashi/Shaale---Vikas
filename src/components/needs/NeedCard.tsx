import { Need } from '../../types';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { IndianRupee, Plus, Check } from 'lucide-react';

interface NeedCardProps {
  need: Need;
  onPledge: (needId: string) => void | Promise<void>;
}

export default function NeedCard({ need, onPledge }: NeedCardProps) {
  const progress = Math.min(100, (need.collectedAmount / need.costEstimate) * 100);
  const isFulfilled = progress >= 100 || need.status === 'Fulfilled';
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white border border-natural-line rounded-[32px] p-5 flex gap-5 items-center group transition-all",
        isFulfilled && "opacity-70"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span className={cn(
            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
            isFulfilled ? "bg-green-100 text-green-700" : 
            need.category === 'Infrastructure' ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"
          )}>
            {isFulfilled ? 'Completed' : need.category}
          </span>
          <span className="text-sm font-bold text-natural-green flex items-center">
            <IndianRupee className="w-3 h-3 mr-0.5" />
            {need.costEstimate.toLocaleString()}
          </span>
        </div>

        <h4 className="text-lg font-bold text-natural-ink truncate mb-1">{need.title}</h4>
        <p className="text-sm text-natural-muted line-clamp-1 mb-4 italic">
          {need.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between text-[11px] mb-1 font-medium">
            <span className="text-natural-muted">
              ₹ {need.collectedAmount.toLocaleString()} pledged
            </span>
            <span className={cn("font-bold", isFulfilled ? "text-green-600" : "text-natural-ink")}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={cn(
            "h-2 rounded-full overflow-hidden",
            isFulfilled ? "bg-green-100" : "bg-natural-line"
          )}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                isFulfilled ? "bg-green-600" : "bg-natural-green"
              )}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={() => onPledge(need.id)}
        disabled={isFulfilled}
        className={cn(
          "p-4 rounded-full transition-all flex items-center justify-center",
          isFulfilled 
            ? "bg-green-100 text-green-600 cursor-default" 
            : "bg-natural-line text-natural-ink group-hover:bg-natural-green group-hover:text-white"
        )}
      >
        {isFulfilled ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </motion.div>
  );
}
