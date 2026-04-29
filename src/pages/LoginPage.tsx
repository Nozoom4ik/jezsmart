import React from 'react';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/src/lib/firebase';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm space-y-8"
      >
        <div className="space-y-4">
          <div className="w-20 h-20 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-200">
            <span className="text-4xl font-black italic">J</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-gray-900">JezSmart</h1>
            <p className="text-gray-500 font-medium">Digital Gateway to Zhezqazgan</p>
          </div>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            Sign in to track your bus, report city issues, and earn JezPoints for community contributions.
          </p>
          <Button 
            onClick={signInWithGoogle}
            className="w-full h-14 rounded-2xl bg-white border border-gray-100 text-gray-900 hover:bg-gray-50 shadow-sm flex items-center justify-center gap-3 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="font-bold">Continue with Google</span>
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Kazakh</span>
          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest italic border-b-2 border-blue-600">Russian</span>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">English</span>
        </div>
      </motion.div>
    </div>
  );
}
