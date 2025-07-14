import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableSortLabel,
    Paper,
    Box,
    IconButton,
    Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { IAvailableProductTableProps } from '../services/availableProductService';

const AvailableProductTable: React.FC<IAvailableProductTableProps> = ({
    products,
    loading,
    page,
    rowsPerPage,
    orderBy,
    order,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleEditClick,
    handleDeleteClick,
    isMobile
}) => {
    return (
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TableContainer sx={{ flex: 1 }}>
                <Table stickyHeader aria-label="ürün tablosu" size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'id'}
                                    direction={orderBy === 'id' ? order : 'asc'}
                                    onClick={() => handleRequestSort('id')}
                                >
                                    ID
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'productName'}
                                    direction={orderBy === 'productName' ? order : 'asc'}
                                    onClick={() => handleRequestSort('productName')}
                                >
                                    Ürün Adı
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Yükleniyor...
                                </TableCell>
                            </TableRow>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title="Düzenle">
                                                <IconButton
                                                    onClick={() => handleEditClick(product.id!)}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Sil">
                                                <IconButton
                                                    onClick={() => handleDeleteClick(product.id!)}
                                                    size="small"
                                                    color="error"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Kayıt bulunamadı
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
            />
        </Paper>
    );
};

export default AvailableProductTable;