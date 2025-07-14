import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    IconButton,
    Snackbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import {
    addUser,
    deleteUser,
    getAllUser
} from '../services/userService';
import { UserData } from '../types/userTypes';
import { getComparator, stableSort } from '../utils/tableAvailableProduct';

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [currentUser, setCurrentUser] = useState<Partial<UserData> | null>(null);
    const [actionType, setActionType] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState<keyof UserData>('id');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    useEffect(() => {
        const loadUsers = async () => {
            try {
                const result = await getAllUser();
                setUsers(result);
                setLoading(false);
            } catch (error) {
                console.error('Kullanıcı yükleme hatası:', error);
                setLoading(false);
                showSnackbar('Kullanıcılar yüklenirken hata oluştu', 'error');
            }
        };

        loadUsers();
    }, []);

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleAddClick = () => {
        setCurrentUser(null);
        setActionType('add');
        setFormOpen(true);
    };

    const handleEditClick = (id: number) => {
        const user = users.find((item) => item.id === id);
        if (user) {
            setCurrentUser(user);
            setActionType('edit');
            setFormOpen(true);
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setActionType('delete');
        setConfirmationOpen(true);
    };

    const handleFormSubmit = async (formData: Partial<UserData>) => {
        try {
            if (actionType === 'add') {
                const newUser = await addUser(formData);
                setUsers((prev) => [...prev, newUser]);
                showSnackbar('Kullanıcı başarıyla eklendi', 'success');
            } else if (actionType === 'edit' && currentUser?.id) {

                const updatedUser = await addUser({
                    ...formData,
                    id: currentUser.id
                });
                setUsers((prev) =>
                    prev.map((item) => (item.id === currentUser.id ? updatedUser : item))
                );
                showSnackbar('Kullanıcı başarıyla güncellendi', 'success');
            }

            setFormOpen(false);
            setCurrentUser(null);
            setActionType(null);
        } catch (error: any) {
            console.error('İşlem sırasında hata:', error);
            showSnackbar(error.response ? error.response.data.message : 'İşlem sırasında hata oluştu ', 'error');

        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedId) return;

        try {

            await deleteUser(selectedId);

            setUsers((prev) => prev.filter((item) => item.id !== selectedId));
            showSnackbar('Kullanıcı başarıyla silindi', 'success');
        } catch (error) {
            console.error('Silme işlemi sırasında hata:', error);
            showSnackbar('Silme işlemi sırasında hata oluştu', 'error');
        } finally {
            setConfirmationOpen(false);
            setSelectedId(null);
            setActionType(null);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property: keyof UserData) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedAndFilteredUsers = stableSort<UserData>(
        users,
        getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ p: isMobile ? 1 : 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Kullanıcı Yönetimi
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{ height: 'fit-content' }}
                >
                    Yeni Kullanıcı Ekle
                </Button>
            </Box>

            <UserTable
                users={sortedAndFilteredUsers}
                loading={loading}
                page={page}
                rowsPerPage={rowsPerPage}
                orderBy={orderBy}
                order={order}
                handleRequestSort={handleRequestSort}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                isMobile={isMobile}
            />

            <UserForm
                open={formOpen}
                handleClose={() => setFormOpen(false)}
                handleSubmit={handleFormSubmit}
                initialData={currentUser}
            />

            <ConfirmationDialog
                open={confirmationOpen}
                title="Silme Onayı"
                message="Bu kullanıcıyı silmek istediğinizden emin misiniz?"
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    setConfirmationOpen(false);
                    setActionType(null);
                    setSelectedId(null);
                }}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbarSeverity}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setSnackbarOpen(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UserManagementPage;