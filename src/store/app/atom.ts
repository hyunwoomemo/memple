import {atom} from 'jotai';

export const appAtom = atom({
  theme: 'light',
});

export const setTheme = atom(null, (get, set, theme: string) => {
  const data = get(appAtom);

  set(appAtom, {...data, theme});
});

export const getThemeAtom = atom(get => get(appAtom).theme);
