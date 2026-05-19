export const LANGS = ['ru', 'tt', 'en'];
export const LANG_LABELS = { ru: 'Рус', tt: 'Тат', en: 'Eng' };

const t = {
  // Header
  'app.title': { ru: 'AI Маркетолог', tt: 'AI Маркетолог', en: 'AI Marketer' },
  'nav.pricing': { ru: 'Тарифы', tt: 'Тарифлар', en: 'Pricing' },
  'nav.login': { ru: 'Войти', tt: 'Керү', en: 'Login' },
  'nav.back': { ru: 'Назад', tt: 'Артка', en: 'Back' },

  // Hero
  'hero.badge': { ru: 'СИСТЕМА 1=10 • 20 AI-ПРОМПТОВ', tt: 'СИСТЕМА 1=10 • 20 AI-ПРОМПТЛАР', en: 'SYSTEM 1=10 • 20 AI PROMPTS' },
  'hero.title1': { ru: 'Автоматизируй', tt: 'Автоматлаштыр', en: 'Automate' },
  'hero.title2': { ru: 'маркетинг', tt: 'маркетингны', en: 'marketing' },
  'hero.title3': { ru: 'за 5 минут с AI', tt: '5 минутта AI белән', en: 'in 5 min with AI' },
  'hero.subtitle': {
    ru: 'Платформа из 20 промптов, которая заменяет копирайтера, продажника и стратега. Один человек = целый отдел маркетинга.',
    tt: '20 промпттан торган платформа, копирайтер, сатучы һәм стратегны алыштыра. Бер кеше = бөтен маркетинг бүлеге.',
    en: 'A platform of 20 prompts that replaces a copywriter, salesperson, and strategist. One person = an entire marketing department.'
  },
  'hero.cta': { ru: 'Начать', tt: 'Башлау', en: 'Start' },
  'hero.pricing': { ru: 'Тарифы', tt: 'Тарифлар', en: 'Pricing' },
  'hero.nav_title': { ru: 'Навигация', tt: 'Навигация', en: 'Navigation' },

  // Pricing
  'pricing.badge': { ru: 'Тарифы', tt: 'Тарифлар', en: 'Pricing' },
  'pricing.title': { ru: 'Выберите свой план', tt: 'Планыгызны сайлагыз', en: 'Choose your plan' },
  'pricing.subtitle': { ru: 'Оплата через Telegram. Моментальный доступ после оплаты.', tt: 'Telegram аша түләү. Түләгәннән соң тиз арада керү.', en: 'Payment via Telegram. Instant access after payment.' },
  'pricing.footer': { ru: 'Все цены указаны в рублях. Оплата через Telegram.', tt: 'Бөтен бәяләр рубльдә. Telegram аша түләү.', en: 'All prices are in rubles. Payment via Telegram.' },
  'pricing.current': { ru: 'Текущий план', tt: 'Хәзерге план', en: 'Current plan' },

  // Plans
  'plan.day.name': { ru: '1 День', tt: '1 Көн', en: '1 Day' },
  'plan.day.desc': { ru: 'Попробовать систему', tt: 'Системаны сынау', en: 'Try the system' },
  'plan.day.cta': { ru: 'Оплатить 100₽', tt: '100₽ түләргә', en: 'Pay 100₽' },
  'plan.basic.name': { ru: 'Базовый', tt: 'Башлангыч', en: 'Basic' },
  'plan.basic.desc': { ru: 'Для фрилансеров', tt: 'Фрилансерлар өчен', en: 'For freelancers' },
  'plan.basic.cta': { ru: 'Оплатить 490₽', tt: '490₽ түләргә', en: 'Pay 490₽' },
  'plan.pro.name': { ru: 'Про', tt: 'Про', en: 'Pro' },
  'plan.pro.desc': { ru: 'Для предпринимателей', tt: 'Эшкуарлар өчен', en: 'For entrepreneurs' },
  'plan.pro.cta': { ru: 'Оплатить 990₽', tt: '990₽ түләргә', en: 'Pay 990₽' },
  'plan.pro.badge': { ru: 'Популярный', tt: 'Популяр', en: 'Popular' },
  'plan.business.name': { ru: 'Бизнес', tt: 'Бизнес', en: 'Business' },
  'plan.business.desc': { ru: 'Для агентств', tt: 'Агентлыклар өчен', en: 'For agencies' },
  'plan.business.cta': { ru: 'Оплатить 1990₽', tt: '1990₽ түләргә', en: 'Pay 1990₽' },

  // Features
  'feat.prompts3': { ru: '3 промпта из Блока 1', tt: '1 Блоктан 3 промпт', en: '3 prompts from Block 1' },
  'feat.dna_basic': { ru: 'Business DNA (базовый)', tt: 'Business DNA (башлангыч)', en: 'Business DNA (basic)' },
  'feat.profile1': { ru: '1 профиль проекта', tt: '1 проект профиле', en: '1 project profile' },
  'feat.prompts10': { ru: '10 промптов (Блоки 1-2)', tt: '10 промпт (1-2 Блоклар)', en: '10 prompts (Blocks 1-2)' },
  'feat.dna_full': { ru: 'Business DNA полный', tt: 'Business DNA тулы', en: 'Business DNA full' },
  'feat.profiles3': { ru: '3 профиля проектов', tt: '3 проект профиле', en: '3 project profiles' },
  'feat.updates': { ru: 'Обновления промптов', tt: 'Промптлар яңартулары', en: 'Prompt updates' },
  'feat.email': { ru: 'Email поддержка', tt: 'Email ярдәме', en: 'Email support' },
  'feat.all20': { ru: 'Все 20 промптов', tt: 'Бөтен 20 промпт', en: 'All 20 prompts' },
  'feat.profiles10': { ru: '10 профилей проектов', tt: '10 проект профиле', en: '10 project profiles' },
  'feat.priority': { ru: 'Приоритетные обновления', tt: 'Приоритетлы яңартулар', en: 'Priority updates' },
  'feat.tg_support': { ru: 'Telegram поддержка', tt: 'Telegram ярдәме', en: 'Telegram support' },
  'feat.first': { ru: 'Новые промпты первым', tt: 'Яңа промптлар беренче', en: 'New prompts first' },
  'feat.unlimited': { ru: 'Безлимитные профили', tt: 'Чикләнмәгән профильләр', en: 'Unlimited profiles' },
  'feat.api': { ru: 'API доступ', tt: 'API кертү', en: 'API access' },
  'feat.manager': { ru: 'Персональный менеджер', tt: 'Шәхси менеджер', en: 'Personal manager' },
  'feat.custom': { ru: 'Кастомные промпты', tt: 'Кастом промптлар', en: 'Custom prompts' },
  'feat.whitelabel': { ru: 'White-label решение', tt: 'White-label чишелеш', en: 'White-label solution' },
  'feat.247': { ru: 'Поддержка 24/7', tt: '24/7 ярдәм', en: '24/7 support' },

  // Guide
  'guide.title': { ru: 'Руководство', tt: 'Кулланма', en: 'Guide' },
  'guide.quote': { ru: '"Нейросети — это не хайп, а новая грамотность."', tt: '"Нейросетьләр — бу хайп түгел, ә яңа грамоталылык."', en: '"Neural networks are not hype, but new literacy."' },
  'guide.how': { ru: 'Как работает Система 1=10?', tt: 'Система 1=10 ничек эшли?', en: 'How does System 1=10 work?' },
  'guide.how_text': { ru: 'Один сотрудник = объем работы 10 специалистов.', tt: 'Бер хезмәткәр = 10 белгечнең эш күләме.', en: 'One employee = the workload of 10 specialists.' },
  'guide.economy': { ru: 'Экономика', tt: 'Экономика', en: 'Economics' },

  // FAQ
  'faq.title': { ru: 'Вопросы и ответы', tt: 'Сораулар һәм җаваплар', en: 'FAQ' },

  // CTA
  'cta.title': { ru: 'Начни сейчас', tt: 'Хәзер башла', en: 'Start now' },
  'cta.subtitle': { ru: '1 день полного доступа — всего 100₽. Попробуй систему в деле.', tt: '1 көн тулы кертү — бары тик 100₽. Системаны эштә сына.', en: '1 day full access — only 100₽. Try the system in action.' },
  'cta.button': { ru: 'Оплатить 100₽ и начать', tt: '100₽ түләргә һәм башларга', en: 'Pay 100₽ and start' },

  // Footer
  'footer.contact': { ru: '— связаться', tt: '— элемтә', en: '— contact' },

  // Theme
  'theme.light': { ru: 'Светлая', tt: 'Ачык', en: 'Light' },
  'theme.dark': { ru: 'Темная', tt: 'Караңгы', en: 'Dark' },

  // Auth
  'auth.login': { ru: 'Вход', tt: 'Керү', en: 'Login' },
  'auth.register': { ru: 'Регистрация', tt: 'Теркәлү', en: 'Register' },
  'auth.name': { ru: 'Имя', tt: 'Исем', en: 'Name' },
  'auth.email': { ru: 'Email', tt: 'Email', en: 'Email' },
  'auth.password': { ru: 'Пароль', tt: 'Пароль', en: 'Password' },
  'auth.submit_login': { ru: 'Войти', tt: 'Керергә', en: 'Sign in' },
  'auth.submit_register': { ru: 'Создать аккаунт', tt: 'Аккаунт ясау', en: 'Create account' },
  'auth.trial_note': { ru: 'После регистрации оплатите 100₽ за 1 день доступа', tt: 'Теркәлгәннән соң 1 көн кертү өчен 100₽ түләгез', en: 'After registration, pay 100₽ for 1 day access' },

  // Card
  'card.copy': { ru: 'Скопировать промпт', tt: 'Промптны күчерергә', en: 'Copy prompt' },
  'card.copied': { ru: 'Скопировано', tt: 'Күчерелде', en: 'Copied' },
  'card.locked': { ru: 'Войти для генерации', tt: 'Генерация өчен керегез', en: 'Login to generate' },
  'card.locked_input': { ru: 'Войдите для генерации промптов...', tt: 'Промпт генерациясе өчен керегез...', en: 'Login to generate prompts...' },
  'card.auth_required': { ru: 'Требуется регистрация', tt: 'Теркәлү кирәк', en: 'Registration required' },
};

export function useTranslation(lang = 'ru') {
  return (key) => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang] || entry['ru'] || key;
  };
}

export default t;
