import { apiClient } from '../../../config/axios';

export const getPosts = async () => apiClient.get('/posts');
