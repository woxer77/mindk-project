import { apiClient } from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');
export const createPost = async (data) => apiClient.post('/posts', data);
export const getPost = async (id) => apiClient.get(`/posts/${id}`);
export const editPost = async (id, data) => apiClient.put(`/posts/${id}`, data);
