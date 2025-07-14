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
import CoffeeForm from '../components/CoffeeForm';
import CoffeeTable from '../components/CoffeeTable';
import ConfirmationDialog from '../components/ConfirmationDialog';
import OrderDetailsDialog from '../components/OrderDetailsDialog';
import { addCoffe, coffeOrder, deleteCoffe, getCoffe, updateCoffe } from '../services/coffeService';
import { Coffe, CoffeOrderResponse } from '../types/coffeeTypes';
import { getComparator, stableSort } from '../utils/tableUtils';

const CoffeeManagementPage: React.FC = () => {
    const [coffees, setCoffees] = useState<Coffe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [orderDialogOpen, setOrderDialogOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [currentCoffee, setCurrentCoffee] = useState<Partial<Coffe> | null>(null);
    const [orderData, setOrderData] = useState<CoffeOrderResponse | null>(null);
    const [actionType, setActionType] = useState<'add' | 'edit' | 'delete' | 'order' | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState<keyof Coffe>('id');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const loadCoffees = async () => {
            try {
                const result = await getCoffe();
                setCoffees(result);
                setLoading(false);
            } catch (error) {
                console.error('Kahve yükleme hatası:', error);
                setLoading(false);
                showSnackbar('Kahveler yüklenirken hata oluştu', 'error');
            }
        };

        loadCoffees();
    }, []);

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleAddClick = () => {
        setCurrentCoffee(null);
        setActionType('add');
        setFormOpen(true);
    };

    const handleEditClick = (id: number) => {
        const coffee = coffees.find((item) => item.id === id);
        if (coffee) {
            setCurrentCoffee(coffee);
            setActionType('edit');
            setFormOpen(true);
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setActionType('delete');
        setConfirmationOpen(true);
    };

    const handleOrderClick = async (id: number) => {
        try {
            setLoading(true);
            const result = await coffeOrder(id);
            setOrderData(result);
            setActionType('order');
            setOrderDialogOpen(true);
            showSnackbar('Sipariş bilgileri alındı', 'success');
        } catch (error) {
            console.error('Sipariş bilgisi alma hatası:', error);
            showSnackbar('Sipariş bilgisi alınırken hata oluştu', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (formData: Partial<Coffe>) => {
        try {
            if (actionType === 'add') {
                const newCoffee = await addCoffe(formData);
                setCoffees((prev) => [...prev, newCoffee]);
                showSnackbar('Kahve başarıyla eklendi', 'success');
            } else if (actionType === 'edit' && currentCoffee?.id) {
                const updatedCoffee = await updateCoffe({
                    ...formData,
                    id: currentCoffee.id
                });
                setCoffees((prev) =>
                    prev.map((item) => (item.id === currentCoffee.id ? updatedCoffee : item))
                );
                showSnackbar('Kahve başarıyla güncellendi', 'success');
            }

            setFormOpen(false);
            setCurrentCoffee(null);
            setActionType(null);
        } catch (error: any) {
            console.error('İşlem sırasında hata:', error);
            showSnackbar(error.response ? error.response.data.message : 'İşlem sırasında hata oluştu ', 'error');

        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedId) return;

        try {
            await deleteCoffe(selectedId);
            setCoffees((prev) => prev.filter((item) => item.id !== selectedId));
            showSnackbar('Kahve başarıyla silindi', 'success');
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

    const handleRequestSort = (property: keyof Coffe) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedAndFilteredCoffees = stableSort<Coffe>(
        coffees,
        getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Box sx={{ p: isMobile ? 1 : 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Kahve Yönetimi
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{ height: 'fit-content' }}
                >
                    Yeni Kahve Ekle
                </Button>
            </Box>


            <CoffeeTable
                coffees={sortedAndFilteredCoffees}
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
                handleOrderClick={handleOrderClick}
                isMobile={isMobile}
            />

            <CoffeeForm
                open={formOpen}
                handleClose={() => setFormOpen(false)}
                handleSubmit={handleFormSubmit}
                initialData={currentCoffee}
            />

            <ConfirmationDialog
                open={confirmationOpen}
                title="Silme Onayı"
                message="Bu kahveyi silmek istediğinizden emin misiniz?"
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    setConfirmationOpen(false);
                    setActionType(null);
                    setSelectedId(null);
                }}
            />

            <OrderDetailsDialog
                open={orderDialogOpen}
                handleClose={() => setOrderDialogOpen(false)}
                orderData={orderData}
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

export default CoffeeManagementPage;