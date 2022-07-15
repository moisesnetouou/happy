import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.27.50.74:3333'
})