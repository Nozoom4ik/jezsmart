import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, Bus, Stethoscope, AlertTriangle, Zap, ArrowRight, Wind, Recycle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const CITY_SERVICES = [
    { id: 'medelement', name: t.medelement, icon: Stethoscope, path: '/profile' },
    { id: 'avtobys', name: t.avtobys, icon: Bus, path: '/transport' },
    { id: 'reports', name: t.reports, icon: AlertTriangle, path: '/petitions' },
    { id: 'utilities', name: t.utilities, icon: Zap, path: '/profile' },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-6"
    >
      {/* Search/JezBot Greeting */}
      <motion.div variants={item} className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
          <Search size={20} />
        </div>
        <Input 
          placeholder={t.searchPlaceholder} 
          className="pl-12 h-14 bg-white border-slate-200 shadow-sm rounded-2xl text-base placeholder:text-slate-400 focus-visible:ring-blue-600/20"
        />
      </motion.div>

      {/* Hero Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden relative h-full">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-slate-900"><Wind size={80} /></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                 <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold uppercase tracking-widest text-[10px]">{t.ecoPulse}</Badge>
              </div>
              <CardTitle className="text-4xl font-black tracking-tighter text-slate-800">AQI 32</CardTitle>
              <CardDescription className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{t.aqi}: {t.excellent}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.outdoorConditions}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-slate-200 shadow-sm bg-slate-900 text-white overflow-hidden relative h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Recycle size={80} /></div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                 <Badge className="bg-blue-600/20 text-blue-400 border-none font-bold uppercase tracking-widest text-[10px]">{t.rewards}</Badge>
              </div>
              <CardTitle className="text-4xl font-black tracking-tighter italic">1,250</CardTitle>
              <CardDescription className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{t.points}</CardDescription>
            </CardHeader>
            <CardContent>
              <div onClick={() => navigate('/profile')} className="flex items-center gap-1 text-[10px] font-bold text-blue-400 uppercase tracking-widest cursor-pointer hover:text-blue-300 transition-colors">
                {t.redeem} <ArrowRight size={14} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Services Grid */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.services}</h2>
          <button onClick={() => window.alert(t.comingSoon)} className="text-xs font-bold text-blue-600 hover:underline">{t.viewAll}</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CITY_SERVICES.map((service) => (
            <button key={service.id} onClick={() => navigate(service.path)} className="flex flex-col items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 group text-center">
              <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <service.icon size={24} />
              </div>
              <span className="text-[11px] font-bold text-slate-700 tracking-tight">{service.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Transport & News Split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div variants={item} className="lg:col-span-3">
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-50">
              <div>
                <CardTitle className="text-lg font-bold tracking-tight text-slate-800">{t.nearbyTransport}</CardTitle>
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{t.realtime}</CardDescription>
              </div>
              <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                <Bus size={20} />
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {[
                  { id: '10', number: '10', to: language === 'en' ? 'Abay St.' : 'ул. Абая', status: 'on_time', arrival: language === 'kk' ? '4 мин' : language === 'ru' ? '4 мин' : '4 min' },
                  { id: '4', number: '4', to: language === 'en' ? 'Metallurgist Sq.' : 'пл. Металлургов', status: 'delayed', arrival: language === 'kk' ? '12 мин' : language === 'ru' ? '12 мин' : '12 min' }
              ].map((route) => (
                <div key={route.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => navigate('/transport')}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white h-10 px-3 flex items-center justify-center rounded-xl border border-slate-200 font-black text-slate-800 shadow-sm">{route.number}</div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{language === 'en' ? 'To' : 'До'}: {route.to}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${route.status === 'on_time' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                          {route.status === 'on_time' ? (language === 'en' ? 'On Schedule' : 'По расписанию') : (language === 'en' ? 'Delayed' : 'Задерживается')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-blue-600 tracking-tighter">{route.arrival}</div>
                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">ETA</div>
                  </div>
                </div>
              ))}
              <Button onClick={() => navigate('/map')} variant="ghost" className="w-full h-12 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 mt-2">
                {language === 'en' ? 'Launch Full Map Hub' : 'Открыть карту города'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <Tabs defaultValue="official" className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
              <TabsList className="bg-transparent h-10 w-full">
                <TabsTrigger value="official" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">{t.officialNews}</TabsTrigger>
                <TabsTrigger value="event" className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">{t.events}</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="official" className="mt-0 space-y-4">
                {[
                    { id: 1, title: language === 'en' ? 'New Park Opening' : language === 'ru' ? 'Открытие нового парка' : 'Жаңа саябақтың ашылуы', summary: language === 'en' ? 'Construction finalized on Abay Street.' : 'Строительство завершено на улице Абая.', category: 'official' }
                ].map(news => (
                  <div key={news.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 group hover:border-slate-300 transition-all cursor-pointer" onClick={() => window.alert(t.comingSoon)}>
                    <div className="flex items-center justify-between mb-3">
                       <Badge className={news.category === 'alert' ? 'bg-red-50 text-red-600 border-none shadow-none font-bold uppercase tracking-widest text-[9px]' : 'bg-slate-100 text-slate-600 border-none shadow-none font-bold uppercase tracking-widest text-[9px]'}>
                        {language === 'en' ? 'Municipal Update' : 'Городское обновление'}
                       </Badge>
                       <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{language === 'en' ? 'Today' : 'Сегодня'}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{news.title}</h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{news.summary}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="event" className="mt-0 space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-lg border border-slate-200 cursor-pointer" onClick={() => window.alert(t.comingSoon)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 p-5 z-20">
                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">{language === 'en' ? 'May 15' : '15 Мая'}</div>
                    <h3 className="text-base font-bold text-white leading-tight">{language === 'en' ? 'City Marathon 2026' : 'Городской Марафон 2026'}</h3>
                    <button className="flex items-center gap-1.5 text-[10px] font-black text-white/60 uppercase tracking-widest mt-3 group-hover:text-white transition-colors">
                      {t.learnMore} <ArrowRight size={12} />
                    </button>
                  </div>
                  <img 
                    src={`https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&q=80`} 
                    alt="Event" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
