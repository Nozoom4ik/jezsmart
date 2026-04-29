import React from 'react';
import { motion } from 'motion/react';
import { LogIn, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/src/lib/firebase';
import { useAuth } from '@/src/lib/FirebaseProvider';
import { useLanguage } from '../LanguageContext';

export default function LoginPage() {
  const { signInAsGuest } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="space-y-6">
          <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-200">
            <span className="text-5xl font-black italic">J</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 italic">JezSmart</h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              {language === 'ru' ? 'Цифровой портал Жезказгана' : language === 'kk' ? 'Жезқазғанның цифрлық порталы' : 'Digital Gateway to Zhezqazgan'}
            </p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
            {language === 'ru' 
              ? 'Войдите, чтобы отслеживать автобусы, сообщать о проблемах города и получать JezPoints.' 
              : language === 'kk'
              ? 'Автобустарды бақылау, қала проблемалары туралы хабарлау және JezPoints алу үшін жүйеге кіріңіз.'
              : 'Sign in to track your bus, report city issues, and earn JezPoints for community contributions.'}
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={signInWithGoogle}
              className="w-full h-16 rounded-2xl bg-white border border-slate-100 text-slate-900 hover:bg-slate-50 shadow-sm flex items-center justify-center gap-4 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="font-bold tracking-tight">Continue with Google</span>
            </Button>

            <Button 
              onClick={signInAsGuest}
              variant="ghost"
              className="w-full h-14 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 group transition-all"
            >
              <UserCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-black uppercase tracking-widest text-[10px]">
                {language === 'ru' ? 'Войти как гость' : language === 'kk' ? 'Қонақ ретінде кіру' : 'Enter as Guest'}
              </span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white mx-auto w-fit">
          {(['kk', 'ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                language === lang 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
