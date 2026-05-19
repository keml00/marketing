import React from 'react';
import { Check, Zap, Crown, Building2, Sparkles } from 'lucide-react';

const TG_USERNAME = 'keml00';

function buildTGLink(planName, price) {
  const msg = encodeURIComponent(`Здравствуйте! Хочу оплатить тариф "${planName}" (${price}). Прошу выслать реквизиты для оплаты.`);
  return `https://t.me/${TG_USERNAME}?text=${msg}`;
}

const PLANS = [
  {
    id: 'day',
    name: 'plan.day.name',
    price: '100₽',
    period: '1 день',
    desc: 'plan.day.desc',
    features: ['feat.prompts3', 'feat.dna_basic', 'feat.profile1'],
    cta: 'plan.day.cta',
    highlight: false,
    icon: <Zap className="w-5 h-5" />,
    tgLink: buildTGLink('1 День', '100₽'),
  },
  {
    id: 'basic',
    name: 'plan.basic.name',
    price: '490₽',
    period: '/месяц',
    desc: 'plan.basic.desc',
    features: ['feat.prompts10', 'feat.dna_full', 'feat.profiles3', 'feat.updates', 'feat.email'],
    cta: 'plan.basic.cta',
    highlight: false,
    icon: <Sparkles className="w-5 h-5" />,
    tgLink: buildTGLink('Базовый', '490₽/мес'),
  },
  {
    id: 'pro',
    name: 'plan.pro.name',
    price: '990₽',
    period: '/месяц',
    desc: 'plan.pro.desc',
    features: ['feat.all20', 'feat.dna_full', 'feat.profiles10', 'feat.priority', 'feat.tg_support', 'feat.first'],
    cta: 'plan.pro.cta',
    highlight: true,
    badge: 'plan.pro.badge',
    icon: <Crown className="w-5 h-5" />,
    tgLink: buildTGLink('Про', '990₽/мес'),
  },
  {
    id: 'business',
    name: 'plan.business.name',
    price: '1 990₽',
    period: '/месяц',
    desc: 'plan.business.desc',
    features: ['feat.all20', 'feat.unlimited', 'feat.api', 'feat.manager', 'feat.custom', 'feat.whitelabel', 'feat.247'],
    cta: 'plan.business.cta',
    highlight: false,
    icon: <Building2 className="w-5 h-5" />,
    tgLink: buildTGLink('Бизнес', '1990₽/мес'),
  },
];

export default function Pricing({ onSelectPlan, currentPlan, t }) {
  return (
    <section className="py-16 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 text-[#7C3AED]">
          <Zap className="w-3 h-3" />{t('pricing.badge')}
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-theme tracking-tight mb-4">
          {t('pricing.title')}
        </h2>
        <p className="text-lg text-theme-secondary max-w-2xl mx-auto leading-relaxed">
          {t('pricing.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-1
              ${plan.highlight
                ? 'bg-gradient-to-b from-[#7C3AED]/20 to-[#06B6D4]/10 border-2 border-[#7C3AED]/40 shadow-[0_0_40px_rgba(124,58,237,0.15)]'
                : 'glass-card'
              }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                {t(plan.badge)}
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${plan.highlight ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'bg-[var(--input-bg)] text-theme-secondary'}`}>
                {plan.icon}
              </div>
              <h3 className="text-lg font-bold text-theme">{t(plan.name)}</h3>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-theme">{plan.price}</span>
                <span className="text-sm text-theme-secondary">{plan.period}</span>
              </div>
              <p className="text-sm text-theme-secondary mt-1">{t(plan.desc)}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-theme-secondary">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-[#7C3AED]' : 'text-[#06B6D4]'}`} />
                  <span>{t(feat)}</span>
                </li>
              ))}
            </ul>

            <a
              href={plan.tgLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onSelectPlan && onSelectPlan(plan.id)}
              className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 active:scale-[0.97] text-center block
                ${plan.highlight
                  ? 'btn-premium text-white'
                  : currentPlan === plan.id
                    ? 'bg-[var(--input-bg)] text-theme-secondary border border-[var(--border-color)] cursor-default pointer-events-none'
                    : 'bg-[var(--input-bg)] hover:bg-[var(--border-color)] text-theme border border-[var(--border-color)] hover:border-[#7C3AED]/30'
                }`}
            >
              {currentPlan === plan.id ? t('pricing.current') : t(plan.cta)}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-theme-secondary opacity-60">
          {t('pricing.footer')}
        </p>
      </div>
    </section>
  );
}
