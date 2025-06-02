import { get } from '@/configs/http';

export const test_url = 'v1/tool-report/job/43b30103-b147-489b-a80e-aeb368727bcf';

const testApi = {
  test() {
    return get(test_url);
  },
};

export default testApi;
