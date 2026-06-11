import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8000/api/v1'
    : 'https://madhurithika22-pouring.hf.space/api/v1';

export const documentApi = {
    uploadDocument: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_BASE_URL}/documents/process`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },

    checkStatus: async (taskId) => {
        const response = await axios.get(`${API_BASE_URL}/documents/status/${taskId}`);
        return response.data;
    },

    getAllDocuments: async () => {
        const response = await axios.get(`${API_BASE_URL}/documents`);
        return response.data;
    },

    exportDocuments: async () => {
        const response = await axios.get(`${API_BASE_URL}/documents/export`, {
            responseType: 'blob'
        });
        return response.data;
    }
};