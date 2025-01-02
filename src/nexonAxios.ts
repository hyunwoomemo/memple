import axios from 'axios';
import {API_KEY} from './constants';

const nexonAxios = axios.create({
  baseURL: 'https://open.api.nexon.com', // Nexon API의 baseURL 설정
});

nexonAxios.interceptors.request.use(async config => {
  // 필요한 경우 요청 인터셉터 설정
  config.headers['x-nxopen-api-key'] = API_KEY;
  console.log('ccconfig');
  return config;
});

interface AxiosResponse {
  data: any;
}

const responseBody = (response: AxiosResponse): any => response;

const nexonRequest = {
  get: (url: string): Promise<any> => nexonAxios.get(url).then(responseBody),
};

export default nexonRequest;
