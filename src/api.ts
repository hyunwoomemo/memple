import request from './axios';

export const userApi = {
  kakaoLogin: data => {
    console.log('ddad kakao', data);
    return request.post('/user/kakaoLogin', data);
  },
  getInfo: () => {
    return request.get('/user/info');
  },
};

export const playerApi = {
  login: ({name, server}: {name: string; server: string}) => {
    return request.post('/player/testLogin', {name, server});
  },
  getOcid: ({
    character_name,
    world_name,
  }: {
    character_name: string;
    world_name: string;
  }) => {
    const encodedCharacterName = encodeURIComponent(character_name);
    const encodedWorldName = encodeURIComponent(world_name);

    return request.nexonGet(
      `/maplestorym/v1/id?character_name=${encodedCharacterName}&world_name=${encodedWorldName}`,
    );
  },
  info: ({ocid}: {ocid: string}) => {
    return request.get(`/player/info/${ocid}`);
  },
  // info: ({ocid}: {ocid: string}) => {
  //   return request.nexonGet(`/maplestorym/v1/character/basic?ocid=${ocid}`);
  // },
  setInfo: data => {
    return request.post('/player/setInfo', data);
  },
  register: ({ocid, name, character_job}) => {
    return request.post('/player/register', {ocid, name, character_job});
  },
  myPlayers: () => {
    return request.get('/player/my');
  },
  select: ({id}) => {
    return request.post('/player/select', {id});
  },
  selectedPlayer: () => {
    return request.get('/player/selected');
  },
};

export const partyApi = {
  getList: () => {
    return request.get('/party/get');
  },
  getPartyPlayer: ({party_id}: {party_id: number}) => {
    return request.get(`/party/player/${party_id}`);
  },
};

// 스카니아
// 디오이
