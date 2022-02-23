import axios from 'axios';
import { appPort } from './config';

export const apiClient = axios.create({
  baseURL: `http://localhost:${appPort}`,
  responseType: 'json',
});
