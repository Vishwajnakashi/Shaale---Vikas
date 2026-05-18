import { useState, FormEvent } from 'react';
import { auth } from '../../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  AuthError
} from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { School, Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (formData.name) {
          await updateProfile(userCredential.user, { displayName: formData.name });
        }
      }
    } catch (err) {
      const authError = err as AuthError;
      console.error(authError);
      if (authError.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in Firebase. Please enable it in the Firebase Console -> Authentication -> Sign-in method.');
      } else {
        setError(authError.message || 'Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-natural-bg flex flex-col items-center justify-center p-6 selection:bg-natural-tan/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-natural-green rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-natural-green/20">
            <School className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-natural-green">Shaale-Vikas</h1>
          <p className="text-sm text-natural-muted font-medium tracking-tight mt-1">Empowering Rural Schools Together</p>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-natural-line shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-natural-tan" />
          
          <h2 className="text-2xl font-serif font-bold text-natural-ink mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-natural-muted mb-8 italic">
            {isLogin ? 'Sign in to continue supporting your school.' : 'Join your alumni network and make an impact.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-muted" />
                    <input 
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Aditya Sharma"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all bg-natural-bg/30 placeholder:text-natural-muted/50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-muted" />
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="alumni@school.edu"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all bg-natural-bg/30 placeholder:text-natural-muted/50"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-natural-muted" />
                <input 
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-natural-line focus:ring-2 focus:ring-natural-tan outline-none transition-all bg-natural-bg/30 placeholder:text-natural-muted/50"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 text-red-700 rounded-2xl text-xs border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-natural-green text-white font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-natural-green/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Join Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-natural-muted mt-8">
            {isLogin ? "Don't have an account?" : "Already a member?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-natural-green font-bold hover:underline underline-offset-4"
            >
              {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
