import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from '../constants';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {partyAtom} from '../store/party/atom';
import moment from 'moment';
import {parseMessages} from '../utils/parseMessages';
import {userAtom} from '../store/user/atom';
import {appAtom} from '../store/app/atom';

let socket: Socket | null = null;
interface SocketOptions {
  path: string;
  transports: string[];
  reconnectionDelay: number;
  reconnectionAttempts: number;
}

export const useSocket = () => {
  const queryClient = useQueryClient();
  const [party, setParty] = useAtom(partyAtom);
  const [user, setUSer] = useAtom(userAtom);
  const [app, setApp] = useAtom(appAtom);

  // if (!(user?.player && Object.keys(user?.player).length > 0)) {
  //   return;
  // }

  if (!socket) {
    if (!(user?.player && Object.keys(user?.player).length > 0)) {
      return {socket: null};
    }
    console.log('소켓 없음!!');
    const options: SocketOptions = {
      path: '/socket.io/',
      transports: ['websocket'],
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      query: {server: user?.player?.world_name},
    };
    socket = io(SOCKET_URL, options);
  }

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners();

      socket.on('connect', e => {});

      socket.on('message', e => {
        console.log('socket connect', e);
      });

      socket.on('messages', (data: any) => {
        try {
          setParty(prev => ({...prev, messages: parseMessages(data)}));
        } catch (err) {}
      });

      socket.on('message', (data: any) => {
        setParty(prev => ({
          ...prev,
          messages: parseMessages([data, ...prev.messages]),
        }));
      });

      socket.on('partyPlayer', async (data: any) => {
        // setParty(prev => ({...prev, updatedAt: new Date()}));
        if (data.success) {
          //   // await Promise.all([
          queryClient.invalidateQueries({queryKey: ['getPartyPlayer']});
          queryClient.invalidateQueries({queryKey: ['partyList']});
          //   // queryClient.invalidateQueries({queryKey: ['partyList']}),
          // queryClient.invalidateQueries(['myParty', data.data.player_id]);
          //   // ]);
        }
      });

      socket.on('leaveParty', async data => {
        console.log('ddd', data);

        if (data.success) {
          setParty(prev => ({
            ...prev,
            list: [...prev.list].map(v => {
              if (v.id === data.data.party_id) {
                return {...v, player_count: v.player_count - 1};
              } else {
                return v;
              }
            }),
          }));

          if (user.player.id === data.data.player_id) {
            // queryClient.invalidateQueries(['myParty', data.data.player_id]);
            setParty(prev => ({...prev, updatedAt: new Date()}));
          }
          // queryClient.invalidateQueries(['myParty', user.player.id]);
        }

        // if (user.player.id === data.data.player_id) {
        // myParty 쿼리 무효화
        // queryClient.refetchQueries(['myParty', user.player.id]);
      });

      socket.on('joinParty', async data => {
        console.log('ddd', data);

        if (data.success) {
          setParty(prev => ({
            ...prev,
            list: [...prev.list].map(v => {
              if (v.id === data.data.party_id) {
                return {...v, player_count: v.player_count + 1};
              } else {
                return v;
              }
            }),
          }));

          // queryClient.invalidateQueries(['myParty', user.player.id]);
          setParty(prev => ({...prev, updatedAt: new Date()}));
        }

        // if (user.player.id === data.data.player_id) {
        //   // queryClient.invalidateQueries(['myParty', data.data.player_id]);
        // }
      });

      // socket.on('updateMyParty');

      // socket.on('partyList', asnyc);

      socket.on('disconnect', e => {
        console.log('disconnect', e);
        socket = null;
      });

      socket.on('error', (error: any) => {
        console.log('error', error);
        setApp(prev => ({...prev, error: error}));
      });
    }
  }, [socket]);

  return {socket};
};
