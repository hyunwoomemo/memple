import {atom} from 'jotai';

export const partyAtom = atom({
  messages: [],
});

export const messagesAtom = atom(get => get(partyAtom).messages);
