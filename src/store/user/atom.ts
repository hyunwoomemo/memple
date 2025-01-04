import {atom} from 'jotai';

export const userAtom = atom({
  info: {},
  player: {
    world_name: '',
    name: '',
    character_job: '',
    character_level: 0,
  },
});
