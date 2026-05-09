import api from './api'

export const galleryService = {
  getAll: () => api.get('/gallery'),
  upload: (formData) =>
    api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/gallery/${id}`),
}
