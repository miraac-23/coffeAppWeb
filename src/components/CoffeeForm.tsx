import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Coffe, ICoffeeFormProps, Ingredient } from '../types/coffeeTypes';
import IngredientForm from './IngredientForm';

const CoffeeForm: React.FC<ICoffeeFormProps> = ({
    open,
    handleClose,
    handleSubmit,
    initialData
}) => {
    const [formData, setFormData] = useState<Partial<Coffe>>({
        coffeeName: null,
        preparationTime: null,
        calorie: null,
        price: null,
        ingredients: []
    });

    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setIngredients(initialData.ingredients || []);
        } else {
            setFormData({
                coffeeName: null,
                preparationTime: null,
                calorie: null,
                price: null,
                ingredients: []
            });
            setIngredients([]);
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
        handleSubmit({
            ...formData,
            ingredients: ingredients
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {initialData?.id ? 'Kahve Düzenle' : 'Yeni Kahve Ekle'}
            </DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Kahve Adı"
                            name="coffeeName"
                            value={formData.coffeeName || ''}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Hazırlanma Süresi"
                            name="preparationTime"
                            value={formData.preparationTime || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Kalori"
                            name="calorie"
                            value={formData.calorie || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Fiyat"
                            name="price"
                            type="number"
                            value={formData.price || ''}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            InputProps={{
                                endAdornment: '₺'
                            }}
                        />
                        <IngredientForm
                            ingredients={ingredients}
                            setIngredients={setIngredients}
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

export default CoffeeForm;