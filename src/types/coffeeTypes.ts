export interface Ingredient {
    productId: number | null;
    amount: string | null;
}

export interface Coffe {
     id: number | null;
     coffeeName: string | null;
     preparationTime: string | null;
     calorie: string | null;
     price: number | null;
     ingredients:Ingredient[];
}

export interface CoffeOrderResponse {
    price: number | null;
    coffeeName: string | null;
    preparationTime: string | null;
    calorie: string | null;
    items: CoffeeOrderItem[];
}

export interface CoffeeOrderItem {
    productName: string | null;
    amount: string | null;
}

export interface ICoffeeFormProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (data: Partial<Coffe>) => void;
    initialData?: Partial<Coffe> | null;
}

export interface IConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface IOrderDetailsDialogProps {
    open: boolean;
    handleClose: () => void;
    orderData: CoffeOrderResponse | null;
}

export interface ICoffeeTableProps {
    coffees: Coffe[];
    loading: boolean;
    page: number;
    rowsPerPage: number;
    orderBy: keyof Coffe;
    order: 'asc' | 'desc';
    handleRequestSort: (property: keyof Coffe) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditClick: (id: number) => void;
    handleDeleteClick: (id: number) => void;
    handleOrderClick: (id: number) => void;
    isMobile: boolean;
}