import {atom} from 'jotai';

export const partyAtom = atom({
  messages: [],
  list: [],
  my: [],
});

export const messagesAtom = atom(get => get(partyAtom).messages);
