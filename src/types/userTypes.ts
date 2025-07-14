export interface UserData {
    id: number | null;
    name: string;
    surname: string;
    password: string;
    tcNo: string;
    email: string;
    userType: string;
}

export interface IUserFormProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (data: Partial<UserData>) => void;
    initialData?: Partial<UserData> | null;
}

export interface IConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface IUserTableProps {
    users: UserData[];
    loading: boolean;
    page: number;
    rowsPerPage: number;
    orderBy: keyof UserData;
    order: 'asc' | 'desc';
    handleRequestSort: (property: keyof UserData) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditClick: (id: number) => void;
    handleDeleteClick: (id: number) => void;
    isMobile: boolean;
}

export interface AuthData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: UserData;
}