import axios from 'axios';
import * as https from 'https';

export const axiosRequest = axios.create({
  baseURL: 'https://magento.test/rest/all/V1/',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

