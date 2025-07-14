import React, { useState, useEffect } from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IUserFormProps, UserData } from '../types/userTypes';

const userTypes = [
    { value: 'ADMIN', label: 'Yönetici' },
    { value: 'USER', label: 'Kullanıcı' },
    { value: 'EDITOR', label: 'Editör' }
];

const UserForm: React.FC<IUserFormProps> = ({
    open,
    handleClose,
    handleSubmit,
    initialData
}) => {
    const [formData, setFormData] = useState<Partial<UserData>>({
        name: '',
        surname: '',
        password: '',
        tcNo: '',
        email: '',
        userType: 'USER'
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: '',
                surname: '',
                password: '',
                tcNo: '',
                email: '',
                userType: 'USER'
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialData?.id ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Ad"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Soyad"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="TC Kimlik No"
                            name="tcNo"
                            value={formData.tcNo}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 11 }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        {!initialData?.id && (
                            <TextField
                                label="Şifre"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                required={!initialData?.id}
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                        <TextField
                            select
                            label="Kullanıcı Tipi"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        >
                            {userTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        İptal
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        {initialData?.id ? 'Güncelle' : 'Ekle'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserForm;