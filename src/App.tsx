import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Bus, FileText, User, Bell, Search, MessageSquare, AlertCircle, LogOut, ChevronRight, Settings, ShieldCheck, MapPin, Map as MapIcon } from 'lucide-react';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import JezBotChat from './components/JezBotChat';
import LoginPage from './pages/LoginPage';
import { useAuth } from './lib/FirebaseProvider';
import { logout } from './lib/firebase';
import { useLanguage } from './LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/', icon: Home, label: t.home },
    { path: '/transport', icon: Bus, label: t.transport },
    { path: '/map', icon: MapIcon, label: t.map },
    { path: '/petitions', icon: FileText, label: t.petitions },
    { path: '/profile', icon: User, label: t.profile },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-around items-center z-50 shadow-lg">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive ? 'text-slate-900 scale-110' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-2 rounded-xl ${isActive ? 'bg-slate-900 text-white shadow-md' : ''}`}>
              <item.icon size={20} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function TopBar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm">
      <Link to="/" className="flex items-center gap-4">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-md shadow-blue-100">J</div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-slate-800 leading-none">JezSmart</span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Zhezqazgan City Hub</span>
        </div>
      </Link>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 px-3 h-8">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">AQI 32 ({t.good})</span>
        </div>
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
          {(['kk', 'ru', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-0.5 text-[10px] font-black uppercase transition-all rounded-lg ${
                language === lang 
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-100' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => window.alert(t.comingSoon)} className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { t } = useLanguage();

  if (loading) return null;
  if (!user) return <LoginPage />;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 pb-24 font-sans selection:bg-blue-100 flex flex-col">
        <TopBar />
        
        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/transport" element={
                <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bus size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">{t.avtobys}</h2>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">{t.realtime}. {t.comingSoon}.</p>
                </div>
              } />
              <Route path="/petitions" element={
                <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={32} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2">{t.petitions}</h2>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">{t.comingSoon}.</p>
                </div>
              } />
              <Route path="/profile" element={
                <div className="max-w-md mx-auto space-y-6">
                  <div className="flex flex-col items-center gap-4 py-10 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 w-full h-1 bg-blue-600" />
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                      <AvatarImage src={user.photoURL || ''} />
                      <AvatarFallback className="bg-slate-100 text-slate-400 text-2xl font-bold">
                        {user.displayName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user.displayName}</h2>
                      <div className="flex items-center justify-center gap-1.5 mt-1">
                        <ShieldCheck size={14} className="text-blue-500" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.verifiedResident}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-900 rounded-2xl flex flex-col justify-between text-white shadow-xl shadow-slate-200 h-32 relative overflow-hidden">
                       <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 z-10">{t.points}</span>
                       <span className="text-4xl font-black italic z-10">1,250</span>
                       <div className="absolute -right-4 -bottom-4 opacity-10"><ShieldCheck size={100} /></div>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm h-32">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.rank}</span>
                       <span className="text-4xl font-black italic text-slate-800">#12</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {[
                      { icon: MapPin, label: t.residentAddresses, color: 'text-emerald-500', action: () => window.alert(t.comingSoon) },
                      { icon: Settings, label: t.appSettings, color: 'text-blue-500', action: () => window.alert(t.comingSoon) },
                    ].map((item, i) => (
                      <button key={i} onClick={item.action} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-xl bg-slate-50 ${item.color}`}>
                            <item.icon size={20} />
                          </div>
                          <span className="text-sm font-bold text-slate-600">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                      </button>
                    ))}
                  </div>

                  <Button 
                    onClick={signOut}
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-bold"
                  >
                    <LogOut size={20} className="mr-2" />
                    {t.logout}
                  </Button>
                </div>
              } />
            </Routes>
          </AnimatePresence>
        </main>

        <Navigation />

        {/* SOS Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.confirm(`${t.sos}: Send Emergency SOS to local rescuers in Zhezqazgan?`)}
          className="fixed right-6 bottom-24 h-14 px-6 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-100 flex items-center justify-center gap-2 z-50 group overflow-hidden active:scale-95 transition-transform"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-bold tracking-widest text-xs uppercase">{t.sos}</span>
          <AlertCircle size={20} className="z-10" />
        </motion.button>

        {/* AI Chatbot Launcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBotOpen(true)}
          className="fixed left-6 bottom-24 w-14 h-14 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 group"
        >
          <MessageSquare size={26} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
        </motion.button>

        <JezBotChat isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
