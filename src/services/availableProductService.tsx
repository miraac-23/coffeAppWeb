import customClient from './client';

export interface AvailableProduct {
    id: number | null;
    productName: string | null;
}

export interface IAvailableProductFormProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (data: Partial<AvailableProduct>) => void;
    initialData?: Partial<AvailableProduct> | null;
}

export interface IConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface IAvailableProductTableProps {
    products: AvailableProduct[];
    loading: boolean;
    page: number;
    rowsPerPage: number;
    orderBy: keyof AvailableProduct;
    order: 'asc' | 'desc';
    handleRequestSort: (property: keyof AvailableProduct) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditClick: (id: number) => void;
    handleDeleteClick: (id: number) => void;
    isMobile: boolean;
}

export const addAvailableProduct = async (item: Partial<AvailableProduct>): Promise<AvailableProduct> => {
    try {
        const response = await customClient.post<AvailableProduct>('/api/available-product', item);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAvailableProduct = async (): Promise<AvailableProduct[]> => {
    try {
        const response = await customClient.get<AvailableProduct[]>('/api/available-product');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateAvailableProduct = async (item: Partial<AvailableProduct>): Promise<AvailableProduct> => {

    try {
        const response = await customClient.post<AvailableProduct>('/api/available-product/update', item);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteAvailableProduct = async (id: number): Promise<void> => {
    try {
        await customClient.delete(`/api/available-product/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
};
