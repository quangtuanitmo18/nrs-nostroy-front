import { get } from '@/configs/http';

export const URL_LOGIN = 'login';

const authApi = {
  login(body) {
    return get(URL_LOGIN, body);
  },
};

export default authApi;
