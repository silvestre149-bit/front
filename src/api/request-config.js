import axios from 'axios';
import { responseLogger } from "axios-logger";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

if (process.env.REACT_APP_ENV_TEST.toString() === 'true') {
    api.interceptors.response.use(responseLogger);
}


export default api;
