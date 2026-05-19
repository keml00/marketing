import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Zap, List, ChevronRight, ChevronDown, Info, Lightbulb, PenTool, Type, CheckCircle, Layers, Mic, Scissors, Mail, LayoutGrid, UserSearch, FileText, Shield, CalendarCheck, MessageSquare, TrendingUp, Search, BookOpen, BarChart3, RefreshCw, Sparkles, User, CreditCard, Sun, Moon, Globe } from 'lucide-react';
import Sidebar from './components/Sidebar';
import PromptCard from './components/PromptCard';
import Pricing from './components/Pricing';
import Account from './components/Account';
import { DEFAULT_CONTEXT, CATEGORIES, FAQ_DATA } from './data/constants';
import { PROMPTS_DATA } from './data/prompts';
import { PROMPTS_DATA_2 } from './data/prompts2';
import { PROMPTS_DATA_3 } from './data/prompts3';
import { useTranslation, LANGS, LANG_LABELS } from './data/i18n';
import { useTheme } from './data/theme';

const ALL_PROMPTS = [...PROMPTS_DATA, ...PROMPTS_DATA_2, ...PROMPTS_DATA_3];
const ICON_MAP = { Lightbulb: <Lightbulb className="w-6 h-6" />, PenTool: <PenTool className="w-6 h-6" />, Type: <Type className="w-6 h-6" />, CheckCircle: <CheckCircle className="w-6 h-6" />, Layers: <Layers className="w-6 h-6" />, Mic: <Mic className="w-6 h-6" />, Scissors: <Scissors className="w-6 h-6" />, Mail: <Mail className="w-6 h-6" />, LayoutGrid: <LayoutGrid className="w-6 h-6" />, UserSearch: <UserSearch className="w-6 h-6" />, FileText: <FileText className="w-6 h-6" />, Shield: <Shield className="w-6 h-6" />, CalendarCheck: <CalendarCheck className="w-6 h-6" />, MessageSquare: <MessageSquare className="w-6 h-6" />, TrendingUp: <TrendingUp className="w-6 h-6" />, Search: <Search className="w-6 h-6" />, List: <List className="w-6 h-6" /> };
const genId = () => crypto?.randomUUID?.() || Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

function sendTG(text) {
  fetch("/api/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  }).catch(() => {});
}

export default function App() {
  const [page, setPage] = useState('app'); // app | pricing | account
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(() => { try { return localStorage.getItem('ai_lang') || 'ru'; } catch { return 'ru'; } });
  const { theme, toggle: toggleTheme } = useTheme();
  const t = useTranslation(lang);

  const cycleLang = () => {
    const next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    setLang(next);
    localStorage.setItem('ai_lang', next);
  };

  // Init
  useEffect(() => {
    const saved = localStorage.getItem("ai_profiles");
    const savedActive = localStorage.getItem("ai_active_id");
    let list = [];
    try { if (saved) list = JSON.parse(saved); } catch {}
    if (!list.length) list = [{ id: genId(), name: "Мой Проект #1", context: DEFAULT_CONTEXT }];
    setProfiles(list);
    setActiveProfileId(savedActive && list.find(p => p.id === savedActive) ? savedActive : list[0].id);

    // Load user
    try {
      const u = JSON.parse(localStorage.getItem("ai_user"));
      if (u) setUser(u);
    } catch {}

    setReady(true);

    // Visit counter
    try {
      const visits = parseInt(localStorage.getItem("ai_visits") || "0") + 1;
      localStorage.setItem("ai_visits", String(visits));
      sendTG(`🌐 <b>AI Маркетолог</b>\nВизит #${visits} | ${new Date().toLocaleString("ru")} | ${location.hostname}`);
    } catch {}
  }, []);

  // Save profiles
  useEffect(() => {
    if (ready) {
      localStorage.setItem("ai_profiles", JSON.stringify(profiles));
      if (activeProfileId) localStorage.setItem("ai_active_id", activeProfileId);
    }
  }, [profiles, activeProfileId, ready]);

  // Save user
  useEffect(() => {
    if (user) localStorage.setItem("ai_user", JSON.stringify(user));
    else localStorage.removeItem("ai_user");
  }, [user]);

  const active = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const context = active?.context || DEFAULT_CONTEXT;
  const isIncomplete = !context.role || !context.product;

  const handleFieldChange = useCallback((f, v) => setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, context: { ...p.context, [f]: v } } : p)), [activeProfileId]);
  const setContext = useCallback((c) => setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, context: c } : p)), [activeProfileId]);
  const createProfile = () => { const n = { id: genId(), name: `Проект #${profiles.length + 1}`, context: DEFAULT_CONTEXT }; setProfiles(p => [...p, n]); setActiveProfileId(n.id); };
  const deleteProfile = (id) => { if (profiles.length <= 1) return; setProfiles(p => { const f = p.filter(x => x.id !== id); if (activeProfileId === id) setActiveProfileId(f[0].id); return f; }); };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const navigateTo = (id) => { setTimeout(() => { const el = document.getElementById(`card-${id}`); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); setHighlightedId(id); setTimeout(() => setHighlightedId(null), 3000); } }, 100); };

  // Auth handlers
  const handleRegister = (data) => {
    const users = JSON.parse(localStorage.getItem("ai_users") || "[]");
    if (users.find(u => u.email === data.email)) {
      return false;
    }
    const newUser = { ...data, plan: 'trial', subscriptionStart: Date.now(), promptsUsed: 0, copiesCount: 0, profilesCount: 1 };
    users.push(newUser);
    localStorage.setItem("ai_users", JSON.stringify(users));
    setUser(newUser);
    sendTG(`👤 <b>Новая регистрация!</b>\n\n📧 ${data.email}\n👤 ${data.name}\n📋 План: Пробный (1 день)\n🕐 ${new Date().toLocaleString("ru")}`);
    return true;
  };

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem("ai_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return true; }
    return false;
  };

  const handleLogout = () => { setUser(null); setPage('app'); };

  const handleSelectPlan = (planId) => {
    if (!user) { setPage('account'); return; }
    const updated = { ...user, plan: planId, subscriptionStart: Date.now() };
    setUser(updated);
    // Update in users list
    const users = JSON.parse(localStorage.getItem("ai_users") || "[]");
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) { users[idx] = updated; localStorage.setItem("ai_users", JSON.stringify(users)); }
    const planNames = { trial: 'Пробный', basic: 'Базовый (490₽)', pro: 'Про (990₽)', business: 'Бизнес (1990₽)' };
    sendTG(`💰 <b>Подписка оформлена!</b>\n\n📧 ${user.email}\n👤 ${user.name}\n📋 План: ${planNames[planId]}\n🕐 ${new Date().toLocaleString("ru")}`);
    setPage('account');
  };

  if (!ready) return null;

  // Render page content
  const renderPage = () => {
    if (page === 'pricing') return <Pricing onSelectPlan={handleSelectPlan} currentPlan={user?.plan} t={t} />;
    if (page === 'account') return <Account user={user} onLogin={handleLogin} onRegister={handleRegister} onLogout={handleLogout} onNavigate={setPage} />;
    return renderMainContent();
  };

  const renderMainContent = () => (
    <div className="max-w-7xl mx-auto space-y-24 pb-32">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] p-8 md:p-16 lg:p-20 glass-card border border-white/[0.06]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#7C3AED]/15 to-transparent rounded-full blur-[80px] -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#06B6D4]/10 to-transparent rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 text-[#7C3AED]">
            <Zap className="w-3 h-3" />{t('hero.badge')}
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-[5.5rem] font-extrabold text-theme mb-8 tracking-tight leading-[1.05]">
            {t('hero.title1')}{' '}<span className="gradient-text">{t('hero.title2')}</span><br className="hidden md:block" />{t('hero.title3')}
          </h2>
          <p className="text-lg md:text-xl text-theme-secondary font-normal mb-12 leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setSidebarOpen(true)} className="btn-premium px-8 py-4 text-white font-bold text-sm uppercase tracking-wide flex items-center gap-3">
              <Zap className="w-5 h-5" />{t('hero.cta')}<ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={() => setPage('pricing')} className="px-8 py-4 bg-[var(--input-bg)] hover:bg-[var(--border-color)] border border-[var(--border-color)] hover:border-[#7C3AED]/30 rounded-2xl text-theme font-bold text-sm uppercase tracking-wide flex items-center gap-3 transition-all duration-300">
              <CreditCard className="w-5 h-5" />{t('hero.pricing')}
            </button>
          </div>
          <div className="mt-20 pt-10 border-t border-white/[0.06]">
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><List className="w-3.5 h-3.5" />Навигация</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => scrollTo(c.id)} className="px-4 py-3.5 rounded-2xl text-[10px] font-semibold text-[#94A3B8] bg-white/[0.03] border border-white/[0.06] uppercase tracking-wider hover:bg-white/[0.06] hover:border-[#7C3AED]/30 hover:text-white transition-all duration-300 hover:scale-[1.03] active:scale-95">
                  {c.label.replace("Блок ","#")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prompts — full access for authenticated, teaser for guests */}
      {user ? CATEGORIES.map(cat => (
        <section key={cat.id} id={cat.id} className="scroll-mt-24">
          <header className="flex items-center gap-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] tracking-tight">{cat.label}</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ALL_PROMPTS.filter(p => p.category === cat.id).map(p => (
              <PromptCard key={p.id} promptData={p} context={context} isHighlighted={highlightedId === p.id} onChainNavigation={navigateTo} allPrompts={ALL_PROMPTS} icon={ICON_MAP[p.iconName] || <Zap className="w-6 h-6" />} isAuthenticated={!!user} onAuthRequired={() => setPage('account')} />
            ))}
          </div>
        </section>
      )) : (
        <>
          {/* Teaser: show what's inside */}
          <section className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-theme mb-3">Что внутри: 20 AI-промптов</h3>
              <p className="text-theme-secondary text-lg max-w-2xl mx-auto">5 блоков для полной автоматизации бизнеса. Оплатите от 100₽ и получите мгновенный доступ.</p>
            </div>

            {CATEGORIES.map(cat => (
              <div key={cat.id} className="glass-card p-6 md:p-8 border border-white/[0.06] rounded-[24px]">
                <h4 className="text-lg font-bold text-theme mb-4">{cat.label}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {ALL_PROMPTS.filter(p => p.category === cat.id).map(p => (
                    <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)]">
                      <div className="p-2 rounded-lg bg-[#7C3AED]/10 text-[#7C3AED] shrink-0">
                        {ICON_MAP[p.iconName] || <Zap className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-theme truncate">{p.title}</p>
                        <p className="text-xs text-theme-secondary line-clamp-1">{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* CTA after teaser */}
            <div className="glass-card p-10 md:p-14 text-center border border-[#7C3AED]/20 rounded-[28px] bg-gradient-to-b from-[#7C3AED]/5 to-transparent">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl btn-premium flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-theme mb-3">Получите полный доступ</h3>
              <p className="text-theme-secondary text-base mb-8 max-w-lg mx-auto leading-relaxed">
                Зарегистрируйтесь и оплатите от 100₽/день. Вы получите все 20 промптов, Business DNA и генератор контента.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={() => setPage('account')} className="btn-premium px-8 py-4 text-white font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <User className="w-5 h-5" />Регистрация
                </button>
                <button onClick={() => setPage('pricing')} className="px-8 py-4 bg-[var(--input-bg)] hover:bg-[var(--border-color)] border border-[var(--border-color)] hover:border-[#7C3AED]/30 rounded-2xl text-theme font-bold text-sm uppercase tracking-wide flex items-center gap-2 transition-all duration-300">
                  <CreditCard className="w-5 h-5" />{t('nav.pricing')}
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Guide */}
      <section className="pt-24 border-t border-white/[0.06] max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-theme flex items-center gap-4 mb-12 tracking-tight">
          <div className="w-10 h-10 rounded-xl btn-premium flex items-center justify-center"><BookOpen className="w-5 h-5 text-white" /></div>{t('guide.title')}
        </h2>
        <div className="glass-card p-8 md:p-12 space-y-10 text-theme-secondary text-lg leading-relaxed">
          <div className="pl-6 border-l-2 border-[#7C3AED]/50">
            <p className="text-xl font-semibold italic text-theme">{t('guide.quote')}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-theme mb-3">{t('guide.how')}</h3>
            <p><strong className="text-theme">{t('guide.how_text')}</strong> </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-theme mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-[#7C3AED]" />{t('guide.economy')}</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.03]"><tr><th className="p-5 font-semibold text-[#F8FAFC]">Роль</th><th className="p-5 font-semibold text-[#F8FAFC]">Зарплата</th><th className="p-5 font-semibold gradient-text">С AI</th></tr></thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="hover:bg-white/[0.02]"><td className="p-5">Копирайтер + SMM</td><td className="p-5">~100к₽</td><td className="p-5 font-bold gradient-text">Бесплатно</td></tr>
                  <tr className="hover:bg-white/[0.02]"><td className="p-5">Sales</td><td className="p-5">~60к₽</td><td className="p-5 font-bold gradient-text">Бесплатно</td></tr>
                  <tr className="hover:bg-white/[0.02]"><td className="p-5">Аналитик</td><td className="p-5">~70к₽</td><td className="p-5 font-bold gradient-text">Бесплатно</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto py-16">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <Info className="w-6 h-6 text-[#7C3AED]" />
          <h2 className="text-3xl md:text-4xl font-bold text-theme tracking-tight">{t('faq.title')}</h2>
        </div>
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <details key={i} className="group glass-card overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/20">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h3 className="font-semibold text-[#F8FAFC] pr-4">{item.q}</h3>
                <div className="w-8 h-8 rounded-xl bg-white/[0.04] flex items-center justify-center group-open:bg-[#7C3AED] group-open:text-white transition-all duration-300">
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform duration-300" />
                </div>
              </summary>
              <div className="px-6 pb-6 text-[#94A3B8] border-t border-white/[0.04] pt-4"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative rounded-[28px] overflow-hidden p-12 md:p-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">{t('cta.title')}</h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">{t('cta.subtitle')}</p>
          <button onClick={() => setPage(user ? 'pricing' : 'account')} className="px-10 py-5 bg-white text-[#7C3AED] font-bold text-sm uppercase rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            {t('cta.button')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <a href="https://t.me/keml00" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] hover:bg-[#7C3AED]/10 border border-white/[0.08] hover:border-[#7C3AED]/30 rounded-2xl text-sm font-medium text-[#F8FAFC] transition-all duration-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            @keml00 — связаться
          </a>
        </div>
        <p className="text-[#94A3B8]/50 text-[11px] font-semibold uppercase tracking-[0.3em]">© 2026 AI Маркетолог</p>
      </footer>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-theme animated-gradient-bg">
      {/* Sidebar - only on app page */}
      {page === 'app' && (
        <aside className={`fixed inset-0 z-50 md:static md:inset-auto md:z-auto md:h-full flex transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:w-0"}`}>
          <div className={`absolute inset-0 bg-[#0B1020]/80 backdrop-blur-xl md:hidden ${sidebarOpen ? "block" : "hidden"}`} onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 h-full">
            <Sidebar context={context} onChange={handleFieldChange} setContext={setContext} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} profiles={profiles} activeProfileId={activeProfileId} onProfileChange={setActiveProfileId} onProfileCreate={createProfile} onProfileDelete={deleteProfile} />
          </div>
        </aside>
      )}

      {/* Main */}
      <article className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mesh-gradient">
          <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#7C3AED]/8 rounded-full blur-[150px] floating-glow" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-[#06B6D4]/6 rounded-full blur-[130px] floating-glow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header */}
        <header className="h-[72px] nav-blur flex items-center justify-between px-5 md:px-8 shrink-0 z-40">
          <div className="flex items-center gap-4">
            {page === 'app' && (
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="relative p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#7C3AED]/40 hover:bg-white/[0.06] transition-all duration-300">
                <Menu className={`w-5 h-5 transition-colors duration-300 ${sidebarOpen ? "text-[#7C3AED]" : "text-[#94A3B8]"}`} />
              </button>
            )}
            {page !== 'app' && (
              <button onClick={() => setPage('app')} className="p-2.5 rounded-2xl bg-[var(--input-bg)] border border-[var(--border-color)] hover:border-[#7C3AED]/40 hover:bg-[var(--border-color)] text-theme-secondary hover:text-theme transition-all duration-300 text-sm font-medium flex items-center gap-2">
                <ChevronRight className="w-4 h-4 rotate-180" />{t('nav.back')}
              </button>
            )}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('app')}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.3)] btn-premium">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="hidden sm:block text-[#F8FAFC] font-bold tracking-tight text-base">AI Маркетолог</h1>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-xl text-theme-secondary hover:text-[#7C3AED] hover:bg-[var(--input-bg)] transition-all duration-300" title={theme === 'dark' ? t('theme.light') : t('theme.dark')}>
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={cycleLang} className="px-3 py-2 rounded-xl text-xs font-bold text-theme-secondary hover:text-[#7C3AED] hover:bg-[var(--input-bg)] transition-all duration-300 flex items-center gap-1.5 uppercase">
              <Globe className="w-3.5 h-3.5" />{LANG_LABELS[lang]}
            </button>
            <button onClick={() => setPage('pricing')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${page === 'pricing' ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30' : 'text-theme-secondary hover:text-theme hover:bg-[var(--input-bg)]'}`}>
              <CreditCard className="w-3.5 h-3.5" />{t('nav.pricing')}
            </button>
            <button onClick={() => setPage('account')} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${page === 'account' ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/30' : 'text-theme-secondary hover:text-theme hover:bg-[var(--input-bg)]'}`}>
              <User className="w-3.5 h-3.5" />{user ? user.name.split(' ')[0] : t('nav.login')}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 relative z-10">
          {renderPage()}
        </main>
      </article>
    </div>
  );
}
