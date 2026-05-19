import React, { useState, useMemo } from 'react';
import { Info, Zap, Copy, Check, ChevronRight, CornerDownRight, X, Lightbulb, Lock } from 'lucide-react';

export default function PromptCard({ promptData, context, isHighlighted, onChainNavigation, allPrompts, icon, isAuthenticated, onAuthRequired }) {
  const [inputValue, setInputValue] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showChain, setShowChain] = useState(false);

  const generatedPrompt = useMemo(() => {
    if (!isAuthenticated) return "";
    try { return promptData.template(context, inputValue); } catch { return "Ошибка генерации."; }
  }, [promptData, context, inputValue, isAuthenticated]);

  const handleCopy = async () => {
    if (!isAuthenticated) { onAuthRequired(); return; }
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsCopied(true); setShowChain(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch { alert("Не удалось скопировать."); }
  };

  const nextPrompt = promptData.nextPromptId ? allPrompts.find(p => p.id === promptData.nextPromptId) : null;

  return (
    <article id={`card-${promptData.id}`}
      className={`glass-card overflow-hidden flex flex-col transition-all duration-500 group/card
        ${isHighlighted
          ? "border-[#7C3AED]/60 shadow-[0_0_40px_rgba(124,58,237,0.2)] scale-[1.02] z-10 ring-1 ring-[#7C3AED]/30"
          : "hover:border-[#7C3AED]/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1"
        }`}>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-[#0B1020]/95 backdrop-blur-2xl z-[100] flex flex-col">
          <div className="p-5 border-b border-white/[0.06] flex justify-between items-center nav-blur">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#7C3AED]" />
              <h3 className="font-semibold text-[#F8FAFC]">Как это работает?</h3>
            </div>
            <button onClick={() => setShowInstructions(false)} className="p-2 hover:bg-white/[0.06] rounded-xl transition-colors">
              <X className="w-5 h-5 text-[#94A3B8]" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl mx-auto w-full">
            <ol className="space-y-4">
              {(promptData.instructions || []).map((s, i) => (
                <li key={i} className="flex gap-4 text-sm text-[#F8FAFC]/80">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white flex items-center justify-center text-xs font-bold shrink-0">{i+1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl p-5">
              <p className="text-sm text-[#F8FAFC]/80"><span className="font-bold text-[#7C3AED]">Совет:</span> {promptData.usageTip}</p>
            </div>
            {promptData.lifeHack && (
              <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-[#06B6D4] font-semibold text-xs mb-2"><Lightbulb className="w-3.5 h-3.5" />Лайфхак</div>
                <p className="text-sm text-[#F8FAFC]/70 italic">"{promptData.lifeHack}"</p>
              </div>
            )}
            <button onClick={() => setShowInstructions(false)} className="w-full py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-2xl text-sm font-semibold text-[#F8FAFC] transition-colors">
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="p-6 flex items-start gap-4">
        <div className={`p-3 rounded-2xl shrink-0 border transition-all duration-500
          ${isHighlighted
            ? "bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white border-transparent shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            : "bg-white/[0.04] text-[#7C3AED] border-white/[0.06] group-hover/card:border-[#7C3AED]/20 group-hover/card:bg-[#7C3AED]/10"
          }`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base font-semibold text-[#F8FAFC] leading-snug tracking-tight">{promptData.title}</h3>
            <button onClick={() => setShowInstructions(true)} className="shrink-0 text-[#94A3B8]/50 hover:text-[#7C3AED] p-1 transition-colors">
              <Info className="w-4.5 h-4.5" />
            </button>
          </div>
          <p className="text-sm text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">{promptData.description}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 flex-1 space-y-4">
        {promptData.inputLabel && (
          <div className="relative">
            <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider block mb-2">{promptData.inputLabel}</label>
            <textarea
              className={`w-full bg-[#0B1020]/60 border rounded-2xl p-4 text-sm text-[#F8FAFC] focus:ring-1 focus:ring-[#7C3AED]/50 focus:border-[#7C3AED]/40 outline-none h-28 placeholder:text-[#94A3B8]/40 font-mono resize-y transition-all duration-300
                ${!isAuthenticated ? "opacity-50 pointer-events-none" : ""}
                ${isHighlighted ? "border-[#7C3AED]/40 bg-[#7C3AED]/5" : "border-white/[0.06] hover:border-white/[0.12]"}`}
              placeholder={isAuthenticated ? promptData.inputPlaceholder : "Войдите для генерации промптов..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!isAuthenticated}
            />
            {!isAuthenticated && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#0B1020]/40 backdrop-blur-sm mt-6">
                <div className="flex items-center gap-2 text-[#94A3B8] text-xs font-medium">
                  <Lock className="w-3.5 h-3.5" />Требуется регистрация
                </div>
              </div>
            )}
          </div>
        )}
        <div onClick={() => setShowInstructions(true)} className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all duration-300 group/tip">
          <Zap className="w-3.5 h-3.5 text-[#7C3AED] mt-0.5 shrink-0" />
          <p className="text-xs text-[#94A3B8] italic flex-1 line-clamp-2 leading-relaxed group-hover/tip:text-[#F8FAFC]/70 transition-colors">{promptData.usageTip}</p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="bg-[#0B1020]/40 p-5 border-t border-white/[0.04] flex flex-col gap-4">
        {/* Copy Button */}
        <button onClick={handleCopy}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.97]
            ${!isAuthenticated
              ? "bg-white/[0.06] text-[#94A3B8] border border-white/[0.08] hover:border-[#7C3AED]/30 hover:text-[#F8FAFC]"
              : isCopied
                ? "bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)]"
                : "btn-premium text-white"
            }`}>
          {!isAuthenticated
            ? <><Lock className="w-4 h-4" /><span>Войти для генерации</span></>
            : isCopied
              ? <><Check className="w-4.5 h-4.5" /><span>Скопировано</span></>
              : <><Copy className="w-4.5 h-4.5" /><span>Скопировать промпт</span></>
          }
        </button>

        {/* Chain navigation */}
        {isAuthenticated && nextPrompt && showChain && onChainNavigation && (
          <div className="pt-4 border-t border-white/[0.04]">
            <div className="flex items-start gap-3">
              <CornerDownRight className="w-4 h-4 text-[#06B6D4] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#94A3B8] mb-2"><span className="text-[#F8FAFC] font-semibold">Далее:</span> {nextPrompt.title}</p>
                <button onClick={() => onChainNavigation(nextPrompt.id)}
                  className="w-full py-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-[#7C3AED]/30 rounded-xl text-xs font-semibold text-[#F8FAFC] flex items-center justify-center gap-2 transition-all duration-300">
                  Перейти <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
