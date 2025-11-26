import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS, MOCK_PARTS } from './constants';
import { Language, Theme, Part } from './types';
import { 
  Search, 
  Sun, 
  Moon, 
  Globe, 
  ShoppingCart, 
  Cpu, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Menu, 
  X,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Microscope,
  UploadCloud,
  FileText,
  Check,
  Home,
  Image as ImageIcon,
  ScanLine,
  Activity,
  Box,
  Terminal
} from 'lucide-react';

// --- Sci-Fi UI Components ---

const TechBadge = ({ status }: { status: Part['status'] }) => {
  const styles = {
    'In Stock': 'bg-neon-green/10 text-neon-green border-neon-green/30 shadow-[0_0_10px_-4px_#00ff9d]',
    'Low Stock': 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    'Obsolete': 'bg-red-500/10 text-red-500 border-red-500/30 border-dashed opacity-80',
    'Lead Time': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
    'RFQ': 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
  };

  return (
    <span className={`px-2 py-0.5 clip-tech-border text-[10px] uppercase font-bold tracking-wider border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const SciFiButton = ({ children, onClick, variant = 'primary', className = '' }: { children?: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary', className?: string }) => {
  const baseStyles = "relative group overflow-hidden font-mono text-sm font-bold tracking-wider px-6 py-3 clip-tech-border transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-black hover:shadow-[0_0_20px_hsl(var(--primary))]",
    secondary: "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/50 hover:text-primary hover:bg-secondary"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {/* Hover Glitch Effect Overlay */}
      <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
    </button>
  );
};

const SciFiCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => {
  return (
    <div className="relative group bg-card/40 backdrop-blur-md border border-white/10 p-6 clip-tech-border overflow-hidden hover:border-primary/50 transition-all duration-500">
      {/* Scanner Animation */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-full group-hover:animate-scanline opacity-50"></div>
      
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
        <Activity className="w-4 h-4 text-primary" />
      </div>

      <div className="w-12 h-12 bg-primary/10 rounded-none clip-tech-border flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_-3px_hsl(var(--primary))] transition-all">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-mono font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed font-sans">{desc}</p>
      
      {/* Decorative Corners */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/30"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30"></div>
    </div>
  );
};

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-10">
      <div className="bg-background/90 backdrop-blur-xl border border-primary/50 text-foreground px-6 py-4 clip-tech-border shadow-[0_0_30px_-10px_hsl(var(--primary))] flex items-center gap-4">
        <div className="bg-primary/20 p-2 rounded-full">
          <Check className="w-4 h-4 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-primary font-mono uppercase tracking-widest">System Notification</span>
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#0a0a0c] border border-primary/30 shadow-[0_0_50px_-20px_hsl(var(--primary))] clip-tech-border overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Holographic Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="text-lg font-mono font-bold tracking-tight text-primary">{title}</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 relative">
          {/* Background Grid Decoration */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [query, setQuery] = useState('');
  const [activeView, setActiveView] = useState<'home' | 'search'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter States
  const [selectedMfrs, setSelectedMfrs] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  // Modal & Toast States
  const [isBomModalOpen, setIsBomModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const t = (key: string) => TRANSLATIONS[lang][key] || key;

  const filteredParts = useMemo(() => {
    let result = MOCK_PARTS;
    if (query.trim()) {
      const lowerQ = query.toLowerCase().trim();
      result = result.filter(p => 
        p.mpn.toLowerCase().includes(lowerQ) || 
        p.manufacturer.toLowerCase().includes(lowerQ) ||
        p.description.toLowerCase().includes(lowerQ)
      );
    }
    if (selectedMfrs.length > 0) {
      result = result.filter(p => selectedMfrs.includes(p.manufacturer));
    }
    if (selectedAvailability.length > 0) {
      result = result.filter(p => {
        const isStock = selectedAvailability.includes('In Stock') && p.stock > 0;
        const isObsolete = selectedAvailability.includes('Obsolete') && p.status === 'Obsolete';
        const isLeadTime = selectedAvailability.includes('Lead Time') && (p.status === 'Lead Time' || (p.stock === 0 && p.status !== 'Obsolete'));
        return isStock || isObsolete || isLeadTime;
      });
    }
    return result;
  }, [query, selectedMfrs, selectedAvailability]);

  const availableManufacturers = useMemo(() => {
    return Array.from(new Set(MOCK_PARTS.map(p => p.manufacturer))).sort();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setActiveView('search');
  };

  const handleBomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBomModalOpen(false);
    setToastMessage("BOM Data Stream Received. Analysis in progress.");
  };

  const toggleFilter = (set: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    set(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const availabilityOptions = [
    { id: 'In Stock', labelKey: 'inStock' },
    { id: 'Lead Time', labelKey: 'leadTime' },
    { id: 'Obsolete', labelKey: 'obsolete' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 font-sans selection:bg-primary/30">
      
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <Modal isOpen={isBomModalOpen} onClose={() => setIsBomModalOpen(false)} title={t('bomModalTitle')}>
        <form onSubmit={handleBomSubmit} className="space-y-6">
          <div className="grid gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary/70">{t('name')}</label>
              <input required type="text" className="flex h-11 w-full bg-black/40 border border-white/10 px-4 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 clip-tech-border" placeholder="OPERATOR NAME" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary/70">{t('email')}</label>
              <input required type="email" className="flex h-11 w-full bg-black/40 border border-white/10 px-4 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50 clip-tech-border" placeholder="ID@COMPANY.COM" />
            </div>
          </div>
          
          <div 
            className={`border border-dashed rounded-none p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer clip-tech-border ${isDragOver ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-primary/50 hover:bg-white/5'}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          >
             <div className={`w-14 h-14 rounded-none clip-tech-border flex items-center justify-center mb-4 transition-colors ${isDragOver ? 'bg-primary text-background' : 'bg-white/5 text-muted-foreground'}`}>
               <UploadCloud className="w-7 h-7" />
             </div>
             <p className="text-sm font-mono text-primary mb-1">{t('bomDropzone')}</p>
             <p className="text-xs text-muted-foreground">{t('bomBrowse')}</p>
          </div>
          
          <SciFiButton variant="primary" className="w-full h-12">
            {t('submitBom')}
          </SciFiButton>
        </form>
      </Modal>

      {/* --- Tech Header --- */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-18 py-3 flex items-center justify-between gap-6">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => { setActiveView('home'); setQuery(''); }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-black border border-primary/50 p-2 clip-tech-border relative z-10">
                <Cpu className="w-5 h-5 text-primary animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-lg tracking-tight leading-none">CHIP<span className="text-primary">STORE</span></span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">Industrial Supply</span>
            </div>
          </div>

          {/* Terminal Search */}
          <div className="hidden md:block flex-1 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative w-full group">
              <div className="absolute inset-0 bg-primary/5 clip-tech-border opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full h-10 pl-11 pr-4 bg-black/20 border border-white/10 focus:border-primary/70 focus:bg-black/50 focus:shadow-[0_0_20px_-5px_hsl(var(--primary))] outline-none transition-all text-sm font-mono placeholder:text-muted-foreground/50 clip-tech-border"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* Decorative Tech Lines */}
              <div className="absolute right-2 top-2 w-1 h-1 bg-primary/50 rounded-full opacity-0 group-focus-within:opacity-100"></div>
            </form>
          </div>

          {/* Header Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center border-r border-white/10 pr-4 gap-2">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                {theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-primary/50 rounded-none clip-tech-border text-xs font-mono uppercase transition-colors"
                onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
              >
                <Globe className="w-3.5 h-3.5 text-primary" />
                {lang.toUpperCase()}
              </button>
            </div>

            <SciFiButton variant="primary" className="hidden md:flex !px-4 !py-2 !text-xs" onClick={() => setActiveView('home')}>
              <ShoppingCart className="w-4 h-4" />
              <span>CART (0)</span>
            </SciFiButton>
            
             <button 
              className="md:hidden p-2 text-primary border border-primary/30 clip-tech-border"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Global Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern-dark [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] animate-grid-move opacity-20"></div>
        </div>

        {activeView === 'home' ? (
          /* --- HERO SECTION --- */
          <div className="flex-1 flex flex-col relative z-10">
            
            <div className="container mx-auto px-4 pt-24 pb-32 flex flex-col items-center text-center">
              
              {/* Holographic Intro Badge */}
              <div className="animate-in fade-in slide-in-from-top-5 duration-700">
                <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary mb-10 clip-tech-border shadow-[0_0_15px_-5px_hsl(var(--primary))] backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="tracking-widest">{t('startSourcing')}</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-5xl animate-in zoom-in-50 duration-700 delay-100">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-foreground/50">{t('heroTitle')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                 <SciFiButton 
                  variant="primary" 
                  className="flex-1 h-14 text-base"
                  onClick={() => { setQuery('STM32'); setActiveView('search'); }}
                 >
                    <Search className="w-5 h-5" />
                    {t('searchButton')}
                 </SciFiButton>

                 <SciFiButton 
                  variant="secondary" 
                  className="flex-1 h-14 text-base"
                  onClick={() => setIsBomModalOpen(true)}
                 >
                    <FileText className="w-5 h-5" />
                    {t('uploadBom')}
                 </SciFiButton>
              </div>
            </div>

            {/* Value Props Grid */}
            <div className="container mx-auto px-4 pb-24 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                 <SciFiCard icon={Cpu} title={t('viewAll')} desc="5M+ Indexed Components" />
                 <SciFiCard icon={Truck} title={t('fastShipping')} desc={t('fastShippingDesc')} />
                 <SciFiCard icon={ShieldCheck} title={t('qualityCert')} desc={t('qualityCertDesc')} />
                 <SciFiCard icon={Microscope} title={t('qualityInspect')} desc={t('qualityInspectDesc')} />
              </div>
            </div>
          </div>
        ) : (
          /* --- SEARCH RESULTS PAGE (HUD Style) --- */
          <div className="flex-1 container mx-auto px-4 py-8 flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Breadcrumbs HUD */}
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-8 border-b border-white/5 pb-4">
              <button 
                onClick={() => { setActiveView('home'); setQuery(''); }} 
                className="hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-wider"
              >
                <Home className="w-3 h-3" />
                {t('home')}
              </button>
              <div className="h-px w-4 bg-white/20"></div>
              <span className="text-foreground">{t('breadcrumbsSearch')}</span>
              {query && (
                <>
                  <div className="h-px w-4 bg-primary/50"></div>
                  <span className="text-primary font-bold">"{query}"</span>
                </>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Filters (Tech Drawer) */}
              <div className={`
                fixed inset-0 z-50 bg-black/90 backdrop-blur-xl lg:static lg:bg-transparent lg:inset-auto lg:z-auto lg:w-[260px] lg:shrink-0 lg:block
                transition-all duration-300 ${isMobileFiltersOpen ? 'opacity-100 visible' : 'opacity-0 invisible lg:opacity-100 lg:visible'}
              `}>
                <div className="h-full overflow-y-auto p-6 lg:p-0">
                  <div className="flex items-center justify-between lg:hidden mb-8 border-b border-primary/30 pb-4">
                    <h3 className="font-mono font-bold text-lg text-primary">{t('filtersHeader')}</h3>
                    <button onClick={() => setIsMobileFiltersOpen(false)}>
                      <X className="w-6 h-6 text-primary" />
                    </button>
                  </div>

                  <div className="space-y-8">
                      {/* Filter Group: MFR */}
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                           <Box className="w-3 h-3" />
                           {t('manufacturer')}
                        </h4>
                        <div className="space-y-2 pl-2 border-l border-white/10">
                           {availableManufacturers.map(m => (
                              <label key={m} className="flex items-center gap-3 text-xs text-muted-foreground hover:text-primary cursor-pointer group py-1">
                                <div className="w-3 h-3 border border-white/30 group-hover:border-primary flex items-center justify-center transition-colors">
                                   {selectedMfrs.includes(m) && <div className="w-1.5 h-1.5 bg-primary"></div>}
                                </div>
                                <input type="checkbox" className="hidden" onChange={() => toggleFilter(setSelectedMfrs, m)} />
                                <span className="truncate uppercase tracking-wider">{m}</span>
                              </label>
                           ))}
                        </div>
                      </div>

                      {/* Filter Group: Availability */}
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                           <Activity className="w-3 h-3" />
                           {t('availability')}
                        </h4>
                        <div className="space-y-2 pl-2 border-l border-white/10">
                           {availabilityOptions.map(opt => (
                              <label key={opt.id} className="flex items-center gap-3 text-xs text-muted-foreground hover:text-primary cursor-pointer group py-1">
                                <div className="w-3 h-3 border border-white/30 group-hover:border-primary flex items-center justify-center transition-colors">
                                   {selectedAvailability.includes(opt.id) && <div className="w-1.5 h-1.5 bg-primary"></div>}
                                </div>
                                <input type="checkbox" className="hidden" onChange={() => toggleFilter(setSelectedAvailability, opt.id)} />
                                <span className="uppercase tracking-wider">{t(opt.labelKey)}</span>
                              </label>
                           ))}
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* Data Stream Table */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline gap-4">
                      <h2 className="text-2xl font-mono font-bold text-foreground">
                        DATA_QUERY: <span className="text-primary">{query || "ALL"}</span>
                      </h2>
                      <span className="text-[10px] font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
                        {filteredParts.length} RECORDS FOUND
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setIsMobileFiltersOpen(true)}
                      className="lg:hidden text-primary border border-primary/30 px-3 py-1 text-xs font-mono uppercase"
                    >
                      {t('filter')}
                    </button>
                </div>

                <div className="border border-white/10 bg-black/40 backdrop-blur-sm clip-tech-border overflow-hidden relative">
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-white/10 text-muted-foreground uppercase tracking-wider">
                            <th className="px-6 py-4 font-normal w-16 text-center opacity-50">#</th>
                            <th className="px-6 py-4 font-normal text-primary">{t('colMpn')}</th>
                            <th className="px-6 py-4 font-normal hidden md:table-cell">{t('colDesc')}</th>
                            <th className="px-6 py-4 font-normal">{t('colStock')}</th>
                            <th className="px-6 py-4 font-normal">{t('colPrice')}</th>
                            <th className="px-6 py-4 font-normal text-right">{t('colAction')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredParts.length > 0 ? (
                            filteredParts.map((part, index) => (
                              <tr 
                                key={part.id} 
                                className="group hover:bg-primary/5 transition-colors animate-in slide-in-from-bottom-2 duration-500"
                                style={{ animationDelay: `${index * 50}ms` }}
                              >
                                <td className="px-6 py-4 text-center text-muted-foreground/30">
                                  <ImageIcon className="w-4 h-4 mx-auto group-hover:text-primary transition-colors" />
                                </td>

                                <td className="px-6 py-4">
                                  <div className="text-sm font-bold text-foreground group-hover:text-primary group-hover:underline cursor-pointer transition-colors flex items-center gap-2">
                                    {part.mpn}
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                  </div>
                                  <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{part.manufacturer}</div>
                                  <div className="md:hidden mt-2 text-[10px] text-muted-foreground line-clamp-2">{part.description}</div>
                                </td>

                                <td className="px-6 py-4 hidden md:table-cell text-muted-foreground max-w-xs">
                                  <div className="truncate opacity-70 group-hover:opacity-100 transition-opacity">
                                    {part.description}
                                  </div>
                                </td>

                                <td className="px-6 py-4">
                                  <div className="flex flex-col items-start gap-1.5">
                                    {part.stock > 0 ? <span className="text-neon-green">{part.stock.toLocaleString()}</span> : <span className="text-muted-foreground">0</span>}
                                    <TechBadge status={part.status} />
                                  </div>
                                </td>

                                <td className="px-6 py-4">
                                   <div className="space-y-1">
                                    {part.price > 0 ? (
                                      part.pricingTiers?.slice(0, 2).map((tier, i) => (
                                        <div key={i} className={`flex justify-between gap-4 text-[10px] ${i===0 ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                                          <span>{tier.minQty}+</span>
                                          <span>${tier.price.toFixed(2)}</span>
                                        </div>
                                      ))
                                    ) : (
                                      <span className="text-neon-purple text-[10px] uppercase font-bold tracking-wider">{t('requestQuote')}</span>
                                    )}
                                   </div>
                                </td>

                                <td className="px-6 py-4 text-right">
                                  <button className="h-8 w-8 border border-white/20 hover:border-primary hover:bg-primary hover:text-black flex items-center justify-center transition-all">
                                    <ShoppingCart className="w-3 h-3" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="px-6 py-24 text-center text-muted-foreground">
                                  <div className="flex flex-col items-center justify-center gap-4">
                                    <ScanLine className="w-12 h-12 text-primary/20 animate-pulse" />
                                    <p className="font-mono text-sm uppercase tracking-widest">{t('noResults')}</p>
                                    <button 
                                      onClick={() => { setQuery(''); setSelectedMfrs([]); setSelectedAvailability([]); }} 
                                      className="text-primary hover:underline text-xs font-mono uppercase"
                                    >
                                      [ {t('clearFilters')} ]
                                    </button>
                                  </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- Cyber Footer --- */}
      <footer className="border-t border-white/10 bg-[#050505] py-12 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span>{t('footerCopyright')}</span>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>SYSTEM STATUS: ONLINE</span>
             </div>
             <a href="#" className="hover:text-primary transition-colors">Privacy_Protocol</a>
             <a href="#" className="hover:text-primary transition-colors">Terms_Config</a>
          </div>
        </div>
      </footer>

    </div>
  );
}