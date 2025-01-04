import axios from 'axios';
import {API_KEY, API_URL} from './constants';
import nexonRequest from './nexonAxios';
import {getStorage, setStorage} from './store/asyncStorage';

axios.defaults.baseURL = API_URL;

const refreshAxios = axios.create({baseURL: API_URL});

let _retry = false;

async function getToken() {
  return await getStorage('token');
}

async function getRefreshToken() {
  return await getStorage('refreshToken');
}

// 요청 인터셉터: 모든 요청에 대해 처리
axios.interceptors.request.use(async config => {
  const token = await getToken();
  // const parseToken = token
  //   ?.split("")
  //   ?.filter((v) => v !== '"')
  //   ?.join("");

  // const userAgent = await DeviceInfo.getUserAgent();

  // config.headers["User-Agent"] = `${userAgent} ;appName=spolive`;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
  }

  return config;
});

// 응답 인터셉터: 401 에러 처리
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !_retry) {
      // originalRequest._retry = true;
      _retry = true;
      const refreshToken = await getRefreshToken();
      console.log('refreshToken', refreshToken);

      if (refreshToken) {
        try {
          const response = await refreshAxios.post(
            `${API_URL}/user/refreshToken`,
            {
              refreshToken,
            },
            {headers: {Authorization: `Bearer ${refreshToken}`}},
          );

          console.log('response', response.data);

          const newToken = response.data.TOKEN.accessToken;

          const newRefreshToken = response.data.TOKEN.refreshToken;

          console.log('newToken', newToken);
          // await setToken(newToken);
          setStorage('token', newToken);
          setStorage('refresh_token', newRefreshToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;

          // originalRequest의 헤더 업데이트
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // refresh token이 유효하지 않으면 로그아웃 처리 등 추가 작업
          return Promise.reject(refreshError);
        } finally {
          _retry = false;
        }
      }
    }

    return Promise.reject(error);
  },
);

interface AxiosResponse {
  data: any;
}

const responseBody = (response: AxiosResponse): any => {
  try {
    return response?.data;
  } catch (error) {
    console.log('error', error);
  }
};

interface RequestMethods {
  get: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  nexonGet: (url: string) => Promise<any>;
}

const request: RequestMethods = {
  get: (url: string): Promise<any> =>
    axios
      .get(url)
      .then(responseBody)
      .catch(error => {
        if (error.response) {
          // 서버의 에러 응답 처리
          console.error(
            'Server Error:',
            error.status,
            error.response.data.message,
          );
          return error.response.data;
        } else {
          // 네트워크 또는 기타 에러 처리
          console.error('Network Error:', error.message);
          return error.response.data;
        }
      }),
  post: (url: string, body: any): Promise<any> => {
    return axios
      .post(url, body)
      .then(responseBody)
      .catch(error => {
        if (error.response) {
          // 서버의 에러 응답 처리
          console.error('Server Error:', error.response.data.message);
          return error.response.data;
        } else {
          // 네트워크 또는 기타 에러 처리
          console.error('Network Error:', error.message);
          return error.response.data;
        }
      });
  },
  nexonGet: (url: string): Promise<any> => {
    return nexonRequest
      .get(url)
      .then(responseBody)
      .catch(e => {
        console.log('eee', e.status, e.message);
      });
  },
};

export default request;
