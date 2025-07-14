import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
    Box,
    Chip,
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
import { IUserTableProps } from '../types/userTypes';

const userTypeColors: Record<string, string> = {
    ADMIN: 'error',
    USER: 'primary',
    EDITOR: 'warning'
};

const userTypeLabels: Record<string, string> = {
    ADMIN: 'Yönetici',
    USER: 'Kullanıcı',
    EDITOR: 'Editör'
};

const UserTable: React.FC<IUserTableProps> = ({
    users,
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
                <Table stickyHeader aria-label="kullanıcı tablosu" size={isMobile ? 'small' : 'medium'}>
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
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={() => handleRequestSort('name')}
                                >
                                    Ad
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'surname'}
                                    direction={orderBy === 'surname' ? order : 'asc'}
                                    onClick={() => handleRequestSort('surname')}
                                >
                                    Soyad
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>TC No</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'email'}
                                    direction={orderBy === 'email' ? order : 'asc'}
                                    onClick={() => handleRequestSort('email')}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Kullanıcı Tipi</TableCell>
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
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.surname}</TableCell>
                                    <TableCell>{user.tcNo}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userTypeLabels[user.userType] || user.userType}
                                            color={userTypeColors[user.userType] as any || 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Tooltip title="Düzenle">
                                                <IconButton
                                                    onClick={() => handleEditClick(user.id!)}
                                                    size="small"
                                                    color="primary"
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Sil">
                                                <IconButton
                                                    onClick={() => handleDeleteClick(user.id!)}
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Sayfa başına satır:"
            />
        </Paper>
    );
};

export default UserTable;