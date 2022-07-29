import { apiClient } from '../../../configs/axios';

export const loginUser = async (data) => apiClient.post('/auth/login', data);
