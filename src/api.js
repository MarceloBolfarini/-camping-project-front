import axios from 'axios';

export const base = 'https://jsonplaceholder.typicode.com'

export const api = {
    getAllPosts: async () => {
        const response = await axios.get(`${base}/posts`)
        return response.data;
    },
    addnewPost: async(title, body, userId) => {
        const response = await axios.post(`${base}/posts`, {
            title, body, userId
        });
        return response.data
    }
}
