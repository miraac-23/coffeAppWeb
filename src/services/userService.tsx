import customClient from "./client";

export interface UserData {
    id: number | null;
    name: string;
    surname: string;
    password: string;
    tcNo: string;
    email: string;
    userType: string;
}
export const auth = async (body: any) => {

    try {
        const result = await customClient.post(`/api/users/authenticate`, body)

        return result.data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export const addUser = async (item: Partial<UserData>): Promise<UserData> => {
    try {
        const response = await customClient.post<UserData>('/api/users/add', item);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getUser = async (): Promise<UserData[]> => {
    try {
        const response = await customClient.get<UserData[]>('/api/users/filtre');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllUser = async (): Promise<UserData[]> => {
    try {
        const response = await customClient.get<UserData[]>('api/users');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        await customClient.delete(`api/users/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
};