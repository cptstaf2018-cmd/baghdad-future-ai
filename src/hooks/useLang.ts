import { createContext, useContext, useState, useEffect, type ReactNode, createElement } from 'react';

type Lang = 'ar' | 'en';

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
  t: (ar: string, en: string) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'ar',
  toggle: () => {},
  t: (ar) => ar,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('bfai-lang') as Lang) || 'ar';
    } catch {
      return 'ar';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('bfai-lang', lang); } catch { /* noop */ }
  }, [lang]);

  const toggle = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const t = (ar: string, en: string) => lang === 'ar' ? ar : en;

  return createElement(LangContext.Provider, { value: { lang, toggle, t } }, children);
}

export function useLang() {
  return useContext(LangContext);
}
