import React, { useState } from 'react';
import { Zap, X, Copy, Check, ChevronDown, Plus, Trash2, Sparkles, Play } from 'lucide-react';
import { BUSINESS_DNA_PROMPT, DEMO_CONTEXT } from '../data/constants';

export default function Sidebar({ context, onChange, setContext, isOpen, setIsOpen, profiles, activeProfileId, onProfileChange, onProfileCreate, onProfileDelete }) {
  const [showProfiles, setShowProfiles] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [copied, setCopied] = useState(false);

  const fields = ["role", "product", "audience", "tone", "topics", "styleExample", "channels", "goals"];
  const filled = fields.filter(f => context[f]?.length > 5).length;
  const progress = Math.round(filled / fields.length * 100);

  const enhance = (field) => {
    const val = context[field];
    if (!val) return;
    const e = { role: " + с глубоким пониманием психологии клиента", product: " + решает реальные боли клиентов", audience: " + платежеспособные, ценящие качество", tone: ", вдохновляющий", topics: ", тренды рынка", channels: ", органический трафик", goals: ", увеличение LTV" };
    if (!val.includes(e[field] || "")) onChange(field, val + (e[field] || ""));
  };

  const copyDNA = () => { navigator.clipboard.writeText(BUSINESS_DNA_PROMPT); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const activeProfile = profiles.find(p => p.id === activeProfileId);
  const profileName = activeProfile?.name || "Профиль";

  return (
    <div className={`bg-[#0B1020]/95 backdrop-blur-2xl border-r border-white/[0.06] h-full flex flex-col transition-all duration-300 ${isOpen ? "w-full md:w-[380px]" : "w-0 overflow-hidden"}`}>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="absolute inset-0 z-50 bg-[#0B1020]/95 backdrop-blur-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[#F8FAFC] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#7C3AED]" />Генератор Business DNA
            </h3>
            <button onClick={() => setShowGenerator(false)} className="p-2 hover:bg-white/[0.06] rounded-xl transition-colors">
              <X className="w-5 h-5 text-[#94A3B8]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-5">
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 p-4 rounded-2xl">
              <p className="text-sm text-[#F8FAFC]/80 leading-relaxed">
                <span className="font-bold text-[#7C3AED]">Промпт 0.</span> Используйте в ChatGPT для создания профиля.
              </p>
            </div>
            <div className="bg-[#0B1020] border border-white/[0.06] p-4 rounded-2xl font-mono text-xs text-[#94A3B8] whitespace-pre-wrap max-h-60 overflow-y-auto">
              {BUSINESS_DNA_PROMPT}
            </div>
            <button onClick={copyDNA} className="w-full py-4 btn-premium text-white font-semibold rounded-2xl flex items-center justify-center gap-2">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Скопировано" : "Скопировать промпт"}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-5 border-b border-white/[0.04] min-w-[320px]">
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center btn-premium shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[10px] font-semibold text-[#94A3B8] tracking-[0.15em] uppercase">Business DNA</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setShowProfiles(!showProfiles)}>
              <h2 className="text-lg font-semibold text-[#F8FAFC] group-hover:text-[#7C3AED] transition-colors">{profileName}</h2>
              <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${showProfiles ? 'rotate-180' : ''}`} />
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-[#94A3B8] hover:text-white p-1.5 rounded-xl hover:bg-white/[0.06] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile selector */}
        {showProfiles && (
          <div className="mb-4 bg-[#111827] border border-white/[0.06] rounded-2xl overflow-hidden relative z-20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            {profiles.map(p => (
              <div key={p.id} onClick={() => { onProfileChange(p.id); setShowProfiles(false); }}
                className={`px-4 py-3 flex items-center justify-between hover:bg-white/[0.04] cursor-pointer border-b border-white/[0.04] last:border-0 transition-colors ${p.id === activeProfileId ? "text-[#7C3AED]" : "text-[#94A3B8]"}`}>
                <span className="text-sm font-medium truncate pr-2">{p.name}</span>
                {profiles.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); onProfileDelete(p.id); }} className="p-1 hover:text-red-400 text-[#94A3B8]/40 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
            <button onClick={() => { onProfileCreate(); setShowProfiles(false); }}
              className="w-full px-4 py-3 flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.04] transition-colors">
              <Plus className="w-4 h-4" /> Новый проект
            </button>
          </div>
        )}

        {/* Generate DNA button */}
        <button onClick={() => setShowGenerator(true)}
          className="w-full mb-4 py-3 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-[#7C3AED] hover:bg-[#7C3AED]/15 hover:border-[#7C3AED]/30 transition-all duration-300">
          <Sparkles className="w-4 h-4" />
          <span>Сгенерировать Business DNA</span>
        </button>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]/60">
            <span>Заполнение профиля</span>
            <span className={progress === 100 ? "text-[#06B6D4]" : ""}>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${progress === 100 ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-[0_0_8px_rgba(124,58,237,0.5)]" : "bg-[#7C3AED]/50"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Demo button */}
        <button onClick={() => setContext(DEMO_CONTEXT)}
          className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-white/[0.08] rounded-2xl text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#7C3AED]/30 hover:bg-white/[0.02] transition-all duration-300">
          <Play className="w-3 h-3" /><span>Заполнить демо-данными</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7 min-w-[320px] pb-24">

        {/* Block 1-2 */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-semibold text-[#94A3B8]/50 uppercase tracking-[0.15em] border-b border-white/[0.04] pb-2">О вас и Бизнесе</h3>
          {[
            { id: "role", label: "Кто вы?", ph: "Маркетолог, 5 лет..." },
            { id: "product", label: "Что продаете?", ph: "SaaS платформа..." },
            { id: "audience", label: "Кому? (ЦА)", ph: "Владельцы бизнеса..." },
            { id: "channels", label: "Каналы", ph: "Telegram, Email..." }
          ].map(f => (
            <div key={f.id} className="group/field">
              <label className="flex justify-between text-[10px] font-semibold text-[#94A3B8]/70 uppercase tracking-wider mb-1.5">
                <span>{f.label}</span>
                <button onClick={() => enhance(f.id)} className="opacity-0 group-hover/field:opacity-100 text-[#7C3AED] p-0.5 transition-opacity">
                  <Sparkles className="w-3 h-3" />
                </button>
              </label>
              <textarea
                value={context[f.id]}
                onChange={(e) => onChange(f.id, e.target.value)}
                placeholder={f.ph}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none resize-y h-20 transition-all duration-300 hover:border-white/[0.1]"
              />
            </div>
          ))}
        </div>

        {/* Block 3: Style */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-semibold text-[#94A3B8]/50 uppercase tracking-[0.15em] border-b border-white/[0.04] pb-2">Стиль</h3>
          <div>
            <label className="text-[10px] font-semibold text-[#94A3B8]/70 uppercase tracking-wider mb-1.5 block">Тон голоса</label>
            <input
              type="text"
              value={context.tone}
              onChange={(e) => onChange("tone", e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 text-sm text-[#F8FAFC] focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all duration-300 hover:border-white/[0.1]"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-wider mb-1.5 block flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />Пример стиля
            </label>
            <textarea
              value={context.styleExample}
              onChange={(e) => onChange("styleExample", e.target.value)}
              placeholder="Вставьте пример поста..."
              className="w-full bg-[#7C3AED]/5 border border-[#7C3AED]/15 rounded-2xl p-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 outline-none resize-y h-32 transition-all duration-300 hover:border-[#7C3AED]/25"
            />
          </div>
          <div>
            <label className="text-[10px] font-semibold text-[#94A3B8]/70 uppercase tracking-wider mb-1.5 block">Запрещенные слова</label>
            <input
              type="text"
              value={context.forbiddenWords}
              onChange={(e) => onChange("forbiddenWords", e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 text-sm text-[#F8FAFC] focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all duration-300 hover:border-white/[0.1]"
            />
          </div>
        </div>

        {/* Block 4-5: Goals */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-semibold text-[#94A3B8]/50 uppercase tracking-[0.15em] border-b border-white/[0.04] pb-2">Цели</h3>
          {[
            { id: "topics", label: "Темы", ph: "AI, Маркетинг..." },
            { id: "goals", label: "Цели (KPI)", ph: "10 лидов в неделю..." }
          ].map(f => (
            <div key={f.id}>
              <label className="text-[10px] font-semibold text-[#94A3B8]/70 uppercase tracking-wider mb-1.5 block">{f.label}</label>
              <input
                type="text"
                value={context[f.id]}
                onChange={(e) => onChange(f.id, e.target.value)}
                placeholder={f.ph}
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl p-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all duration-300 hover:border-white/[0.1]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
