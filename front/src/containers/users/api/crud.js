import { apiClient } from '../../../configs/axios';

export const getUsers = async () => apiClient.get('/users');
export const getUser = async (id) => apiClient.get(`/users/${id}`);
export const editUser = async (id, data) => apiClient.put(`/users/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
