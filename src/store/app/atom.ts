import {atom} from 'jotai';

export const appAtom = atom({
  theme: 'light',
  error: null,
  bottomSheet: {
    visible: false,
    body: null,
  },
});

export const setTheme = atom(null, (get, set, theme: string) => {
  const data = get(appAtom);

  set(appAtom, {...data, theme});
});

export const getThemeAtom = atom(get => get(appAtom).theme);
