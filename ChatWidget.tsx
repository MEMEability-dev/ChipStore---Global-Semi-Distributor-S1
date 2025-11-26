import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Phone, Minimize2 } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

interface ChatWidgetProps {
  lang: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  // Initial Welcome Message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          sender: 'ai',
          text: t('chatWelcome'),
          timestamp: new Date()
        }
      ]);
    }
  }, [lang]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Latency
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `I've received your inquiry about "${userMsg.text}". Let me check our global inventory...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleHumanHandoff = () => {
    const sysMsg: Message = {
      id: Date.now().toString(),
      sender: 'system',
      text: t('connectingHuman'),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            drag
            dragMomentum={false}
            // Drag constraints could be set to a ref, but leaving empty allows free movement
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-14 h-14 rounded-full bg-primary/90 text-black shadow-[0_0_20px_hsl(var(--primary))] backdrop-blur-md flex items-center justify-center border-2 border-primary relative overflow-hidden group">
               {/* Pulse Effect */}
               <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
               <MessageSquare className="w-7 h-7 relative z-10" />
               <div className="absolute top-0 right-0 w-3 h-3 bg-neon-green rounded-full border border-black shadow-[0_0_5px_#00ff9d]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0 w-[350px] md:w-[400px] h-[500px] bg-[#0a0a0c]/95 backdrop-blur-xl border border-primary/30 clip-tech-border shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-mono font-bold text-foreground">{t('chatAgentName')}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-foreground transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-primary/20 text-foreground border border-primary/30 rounded-tr-none' 
                      : msg.sender === 'system'
                      ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-xs font-mono text-center w-full'
                      : 'bg-white/5 text-muted-foreground border border-white/10 rounded-tl-none'
                  }`}>
                    {msg.sender === 'system' && <Phone className="w-3 h-3 inline-block mr-2 mb-0.5" />}
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
              <button 
                onClick={handleHumanHandoff}
                className="w-full text-xs font-mono text-primary/70 hover:text-primary hover:bg-primary/5 py-1.5 border border-dashed border-primary/30 hover:border-primary/60 transition-colors"
              >
                [ {t('talkToHuman')} ]
              </button>
              
              <form onSubmit={handleSendMessage} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatPlaceholder')}
                  className="w-full bg-black/40 border border-white/10 text-sm p-3 pr-10 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:text-muted-foreground transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;