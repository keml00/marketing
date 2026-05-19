import React, { useState } from 'react';
import { User, Mail, Lock, LogOut, Crown, Calendar, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

const PLAN_NAMES = { trial: 'Пробный', basic: 'Базовый', pro: 'Про', business: 'Бизнес' };
const PLAN_PRICES = { trial: '0₽', basic: '490₽/мес', pro: '990₽/мес', business: '1 990₽/мес' };

export default function Account({ user, onLogin, onRegister, onLogout, onNavigate }) {
  const [mode, setMode] = useState('login'); // login | register
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!form.name || !form.email || !form.password) {
        setError('Заполните все поля');
        return;
      }
      if (form.password.length < 4) {
        setError('Пароль минимум 4 символа');
        return;
      }
      onRegister({ name: form.name, email: form.email, password: form.password });
    } else {
      if (!form.email || !form.password) {
        setError('Введите email и пароль');
        return;
      }
      const success = onLogin(form.email, form.password);
      if (!success) setError('Неверный email или пароль');
    }
  };

  // If user is logged in — show dashboard
  if (user) {
    const trialEnd = user.plan === 'trial' ? new Date(user.subscriptionStart + 86400000) : null;
    const isTrialExpired = trialEnd && trialEnd < new Date();

    return (
      <section className="py-16 max-w-2xl mx-auto">
        <div className="glass-card p-8 md:p-10 border border-white/[0.06]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">{user.name}</h2>
                <p className="text-sm text-[#94A3B8]">{user.email}</p>
              </div>
            </div>
            <button onClick={onLogout} className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-[#94A3B8] transition-all duration-300">
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Subscription info */}
          <div className="bg-[#0B1020] rounded-2xl p-6 border border-white/[0.04] mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4.5 h-4.5 text-[#7C3AED]" />
                <span className="text-sm font-semibold text-[#F8FAFC]">Текущий план</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                user.plan === 'pro' || user.plan === 'business'
                  ? 'bg-[#7C3AED]/15 text-[#7C3AED] border border-[#7C3AED]/20'
                  : 'bg-white/[0.06] text-[#94A3B8] border border-white/[0.08]'
              }`}>
                {PLAN_NAMES[user.plan] || 'Нет'}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-extrabold text-[#F8FAFC]">{PLAN_PRICES[user.plan] || '—'}</span>
            </div>

            {user.plan === 'trial' && (
              <div className={`flex items-center gap-2 text-sm ${isTrialExpired ? 'text-red-400' : 'text-[#06B6D4]'}`}>
                <Calendar className="w-4 h-4" />
                <span>{isTrialExpired ? 'Пробный период истёк' : `Активен до ${trialEnd.toLocaleDateString('ru')}`}</span>
              </div>
            )}

            {user.plan !== 'trial' && user.subscriptionStart && (
              <div className="flex items-center gap-2 text-sm text-[#06B6D4]">
                <Calendar className="w-4 h-4" />
                <span>Активна с {new Date(user.subscriptionStart).toLocaleDateString('ru')}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {(user.plan === 'trial' || isTrialExpired) && (
              <button onClick={() => onNavigate('pricing')}
                className="w-full py-3.5 btn-premium text-white font-semibold text-sm flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />Обновить план
              </button>
            )}

            {user.plan !== 'trial' && (
              <button onClick={() => onNavigate('pricing')}
                className="w-full py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#7C3AED]/30 rounded-2xl text-[#F8FAFC] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300">
                Сменить тариф <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button onClick={() => onNavigate('app')}
              className="w-full py-3.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-2xl text-[#F8FAFC] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300">
              Перейти к промптам <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 pt-6 border-t border-white/[0.04] grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F8FAFC]">{user.promptsUsed || 0}</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Промптов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F8FAFC]">{user.copiesCount || 0}</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Копий</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#F8FAFC]">{user.profilesCount || 1}</div>
              <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1">Проектов</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Auth form (login / register)
  return (
    <section className="py-16 max-w-md mx-auto">
      <div className="glass-card p-8 border border-white/[0.06]">
        {/* Tabs */}
        <div className="flex mb-8 bg-[#0B1020] rounded-2xl p-1 border border-white/[0.04]">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'login' ? 'bg-[#7C3AED] text-white shadow-[0_2px_10px_rgba(124,58,237,0.3)]' : 'text-[#94A3B8] hover:text-white'}`}
          >
            Вход
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === 'register' ? 'bg-[#7C3AED] text-white shadow-[0_2px_10px_rgba(124,58,237,0.3)]' : 'text-[#94A3B8] hover:text-white'}`}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5 block">Имя</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]/50" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]/50" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5 block">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]/50" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-2xl pl-10 pr-10 py-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8]/30 focus:ring-1 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/30 outline-none transition-all"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]/50 hover:text-[#94A3B8]">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button type="submit" className="w-full py-3.5 btn-premium text-white font-semibold text-sm mt-2">
            {mode === 'register' ? 'Создать аккаунт' : 'Войти'}
          </button>
        </form>

        {mode === 'register' && (
          <p className="text-[10px] text-[#94A3B8]/50 text-center mt-4 leading-relaxed">
            Регистрируясь, вы получаете 1 день бесплатного доступа ко всем промптам
          </p>
        )}
      </div>
    </section>
  );
}
