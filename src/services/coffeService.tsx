import { Coffe, CoffeOrderResponse } from '../types/coffeeTypes';
import customClient from './client';

export const addCoffe = async (item: Partial<Coffe>): Promise<Coffe> => {
    try {
        const response = await customClient.post<Coffe>('api/coffe', item);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getCoffe = async (): Promise<Coffe[]> => {
    try {
        const response = await customClient.get<Coffe[]>('api/coffe');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateCoffe = async (item: Partial<Coffe>): Promise<Coffe> => {

    try {
        const response = await customClient.post<Coffe>('api/coffe/update', item);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteCoffe = async (id: number): Promise<void> => {
    try {
        await customClient.delete(`api/coffe/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const coffeOrder = async (id: number): Promise<CoffeOrderResponse> => {
    try {
        const response = await customClient.post<CoffeOrderResponse>(`api/coffe/order/${id}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};