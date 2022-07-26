import { apiClient } from '../../../configs/axios';

export const getPosts = async () => apiClient.get('/posts');
export const createPost = async (data) => apiClient.post('/posts', data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const getPost = async (id) => apiClient.get(`/posts/${id}`);
export const editPost = async (id, data) => apiClient.put(`/posts/${id}`, data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
