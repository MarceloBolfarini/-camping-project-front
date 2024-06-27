import axios from 'axios';

let token = "";

if(localStorage.getItem('token') != undefined){
    token = localStorage.getItem('token');
} 

export const baseURL = 'http://localhost:8080';

export const api = axios.create({
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Access-Control-Allow-Origin': '*',
    },
    baseURL,
})
