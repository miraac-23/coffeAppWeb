import { Delete as DeleteIcon, Edit as EditIcon, LocalCafe as LocalCafeIcon } from '@mui/icons-material';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import React from 'react';
import { ICoffeeTableProps } from '../types/coffeeTypes';

const CoffeeTable: React.FC<ICoffeeTableProps> = ({
    coffees,
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
    handleOrderClick,
    isMobile
}) => {
    return (
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TableContainer sx={{ flex: 1 }}>
                <Table stickyHeader aria-label="kahve tablosu" size={isMobile ? 'small' : 'medium'}>
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
                                    active={orderBy === 'coffeeName'}
                                    direction={orderBy === 'coffeeName' ? order : 'asc'}
                                    onClick={() => handleRequestSort('coffeeName')}
                                >
                                    Kahve Adı
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'preparationTime'}
                                    direction={orderBy === 'preparationTime' ? order : 'asc'}
                                    onClick={() => handleRequestSort('preparationTime')}
                                >
                                    Hazırlanma Süresi
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'calorie'}
                                    direction={orderBy === 'calorie' ? order : 'asc'}
                                    onClick={() => handleRequestSort('calorie')}
                                >
                                    Kalori
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'price'}
                                    direction={orderBy === 'price' ? order : 'asc'}
                                    onClick={() => handleRequestSort('price')}
                                >
                                    Fiyat
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Malzeme Sayısı</TableCell>
                            <TableCell>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    Yükleniyor...
                                </TableCell>
                            </TableRow>
                        ) : coffees.length > 0 ? (
                            coffees.map((coffee) => (
                                <TableRow key={coffee.id}>
                                    <TableCell>{coffee.id}</TableCell>
                                    <TableCell>{coffee.coffeeName}</TableCell>
                                    <TableCell>{coffee.preparationTime}</TableCell>
                                    <TableCell>{coffee.calorie}</TableCell>
                                    <TableCell>{coffee.price} ₺</TableCell>
                                    <TableCell>{coffee.ingredients?.length || 0}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title="Sipariş Detayı">
                                                <IconButton
                                                    onClick={() => handleOrderClick(coffee.id!)}
                                                    size="small"
                                                    color="info"
                                                >
                                                    <LocalCafeIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Düzenle">
                                                <IconButton
                                                    onClick={() => handleEditClick(coffee.id!)}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Sil">
                                                <IconButton
                                                    onClick={() => handleDeleteClick(coffee.id!)}
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
                                <TableCell colSpan={7} align="center">
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
                count={coffees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
            />
        </Paper>
    );
};

export default CoffeeTable;