import { apiClient } from '../../../config/axios';

export const getUsers = async () => apiClient.get('/users');
export const getUser = async (id) => apiClient.get(`/users/${id}`);
