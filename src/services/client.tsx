import { AxiosInstance } from 'axios';
import { getClient } from './api';

const customClient: AxiosInstance = getClient({baseURL: "http://localhost:8080", timeout: 2000 });

export default customClient;