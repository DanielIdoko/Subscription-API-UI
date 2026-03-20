import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const applyThemeToDom = (mode: ThemeMode) => {
  if (typeof window === 'undefined') return;
  const html = document.documentElement;
  if (mode === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', mode);
};

export const themeStore = create<ThemeState>((set) => {
  let initialTheme: ThemeMode = 'light';

  if (typeof window !== 'undefined') {
    const persisted = localStorage.getItem('theme') as ThemeMode | null;
    if (persisted === 'dark' || persisted === 'light') {
      initialTheme = persisted;
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      initialTheme = prefersDark ? 'dark' : 'light';
    }
    applyThemeToDom(initialTheme);
    }

  return {
    theme: initialTheme,
    setTheme: (mode: ThemeMode) => {
      applyThemeToDom(mode);
      set({ theme: mode });
    },
    toggleTheme: () => {
      set((state) => {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        applyThemeToDom(next);
        return { theme: next };
      });
    },
  };
});
