import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, Loader2 } from 'lucide-react';
import { askJezBot } from '../services/aiService';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../LanguageContext';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function JezBotChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
        const welcome = language === 'kk' ? "Сәлеметсіз бе! Мен JezBot-пын. Бүгін сізге қалай көмектесе алам?" 
                    : language === 'ru' ? "Здравствуйте! Я JezBot. Чем я могу вам помочь сегодня?"
                    : "Hello! I am JezBot. How can I help you today?";
        setMessages([{ role: 'model', content: welcome }]);
    }
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
        const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    try {
        const response = await askJezBot(userMessage, history);
        setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I am having trouble connecting. Error 404." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="bg-white w-full max-w-lg h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight text-sm uppercase italic">JezBot Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">{t.operational}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <ScrollArea className="flex-1 p-6 bg-slate-50" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed max-w-[85%] shadow-sm ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                    }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 text-xs italic rounded-tl-none shadow-sm flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" />
                      JezBot is processing...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-200 bg-white">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.botPlaceholder}
                  className="pr-12 h-14 rounded-2xl border-slate-200 shadow-sm focus-visible:ring-slate-900/10 placeholder:text-slate-400 text-sm"
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 h-10 w-10 p-0 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-[9px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
                Official AI Assistant • Zhezqazgan Digital Dept.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
