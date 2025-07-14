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
import AvailableProductForm from '../components/AvailableProductForm';
import AvailableProductTable from '../components/AvailableProductTable';
import ConfirmationDialog from '../components/ConfirmationDialog';
import {
    addAvailableProduct,
    AvailableProduct,
    deleteAvailableProduct,
    getAvailableProduct,
    updateAvailableProduct
} from '../services/availableProductService';
import { getComparator, stableSort } from '../utils/tableAvailableProduct';


const AvailableProductManagementPage: React.FC = () => {
    const [products, setProducts] = useState<AvailableProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [currentProduct, setCurrentProduct] = useState<Partial<AvailableProduct> | null>(null);
    const [actionType, setActionType] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState<keyof AvailableProduct>('id');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const result = await getAvailableProduct();
                setProducts(result);
                setLoading(false);
            } catch (error) {
                console.error('Ürün yükleme hatası:', error);
                setLoading(false);
                showSnackbar('Ürünler yüklenirken hata oluştu', 'error');
            }
        };

        loadProducts();
    }, []);

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleAddClick = () => {
        setCurrentProduct(null);
        setActionType('add');
        setFormOpen(true);
    };

    const handleEditClick = (id: number) => {
        const product = products.find((item) => item.id === id);
        if (product) {
            setCurrentProduct(product);
            setActionType('edit');
            setFormOpen(true);
        }
    };

    const handleDeleteClick = (id: number) => {
        setSelectedId(id);
        setActionType('delete');
        setConfirmationOpen(true);
    };

    const handleFormSubmit = async (formData: Partial<AvailableProduct>) => {
        try {
            if (actionType === 'add') {
                const newProduct = await addAvailableProduct(formData);
                setProducts((prev) => [...prev, newProduct]);
                showSnackbar('Ürün başarıyla eklendi', 'success');
            } else if (actionType === 'edit' && currentProduct?.id) {
                const updatedProduct = await updateAvailableProduct({
                    ...formData,
                    id: currentProduct.id
                });
                setProducts((prev) =>
                    prev.map((item) => (item.id === currentProduct.id ? updatedProduct : item))
                );
                showSnackbar('Ürün başarıyla güncellendi', 'success');
            }

            setFormOpen(false);
            setCurrentProduct(null);
            setActionType(null);
        } catch (error: any) {
            console.error('İşlem sırasında hata:', error);
            showSnackbar(error.response ? error.response.data.message : 'İşlem sırasında hata oluştu ', 'error');
        }
    };

    const handleDeleteConfirm = async () => {
        if (!selectedId) return;

        try {
            await deleteAvailableProduct(selectedId);
            setProducts((prev) => prev.filter((item) => item.id !== selectedId));
            showSnackbar('Ürün başarıyla silindi', 'success');
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

    const handleRequestSort = (property: keyof AvailableProduct) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedAndFilteredProducts = stableSort<AvailableProduct>(
        products,
        getComparator(order, orderBy)
    ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ p: isMobile ? 1 : 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">
                    Mevcut Ürün Yönetimi
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                    sx={{ height: 'fit-content' }}
                >
                    Yeni Ürün Ekle
                </Button>
            </Box>

            <AvailableProductTable
                products={sortedAndFilteredProducts}
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

            <AvailableProductForm
                open={formOpen}
                handleClose={() => setFormOpen(false)}
                handleSubmit={handleFormSubmit}
                initialData={currentProduct}
            />

            <ConfirmationDialog
                open={confirmationOpen}
                title="Silme Onayı"
                message="Bu ürünü silmek istediğinizden emin misiniz?"
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

export default AvailableProductManagementPage;