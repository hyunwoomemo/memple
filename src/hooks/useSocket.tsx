import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from '../constants';
import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useAtom} from 'jotai';
import {partyAtom} from '../store/party/atom';
import moment from 'moment';
import {parseMessages} from '../utils/parseMessages';

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

  if (!socket) {
    const options: SocketOptions = {
      path: '/socket.io/',
      transports: ['websocket'],
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    };
    socket = io(SOCKET_URL, options);
  }

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners();

      console.log('socket', socket.connected);

      socket.on('connect', () => {
        console.log('connect');
      });

      socket.on('messages', (data: any) => {
        console.log('messages', data);
        try {
          setParty(prev => ({...prev, messages: parseMessages(data)}));
        } catch (err) {
          console.error('err', err);
        }
      });

      socket.on('message', (data: any) => {
        setParty(prev => ({
          ...prev,
          messages: parseMessages([data, ...prev.messages]),
        }));
      });

      socket.on('partyPlayer', (data: any) => {
        console.log('partyPlayer', data);

        if (data.success) {
          queryClient.invalidateQueries('partyList');
          queryClient.invalidateQueries('getPartyPlayer');
        }
      });

      socket.on('error', (error: any) => {
        console.log('error', error);
      });
    }
  }, [socket]);

  return {socket};
};
