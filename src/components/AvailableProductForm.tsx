import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AvailableProduct, IAvailableProductFormProps } from '../services/availableProductService';

const AvailableProductForm: React.FC<IAvailableProductFormProps> = ({
    open,
    handleClose,
    handleSubmit,
    initialData
}) => {
    const [formData, setFormData] = useState<Partial<AvailableProduct>>({
        productName: null
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                productName: null
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialData?.id ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Ürün Adı"
                            name="productName"
                            value={formData.productName || ''}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
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

export default AvailableProductForm;