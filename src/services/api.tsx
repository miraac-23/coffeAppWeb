import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const getClient = (options: AxiosRequestConfig = {}): AxiosInstance => {
    const client: AxiosInstance = axios.create(options);

    client.interceptors.request.use(
        (request) => {

            const token = localStorage.getItem('token');
            if (token) {
                request.headers['Authorization'] = 'Bearer '.concat(token);
            } return request;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    client.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error) => {
            if (error.code === 'ERR_NETWORK') {
                console.log("Axios Error : ", error.message)

            }
            return Promise.reject(error);
        }
    );
    return client;
};
