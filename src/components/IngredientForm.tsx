import { Autocomplete, Box, Button, Chip, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvailableProduct, getAvailableProduct } from '../services/availableProductService';
import { Ingredient } from '../types/coffeeTypes';

interface IngredientFormProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ ingredients, setIngredients }) => {
  const [products, setProducts] = useState<AvailableProduct[]>([]);
  const [newIngredient, setNewIngredient] = useState<Ingredient>({
    productId: null,
    amount: null
  });
  const [selectedProduct, setSelectedProduct] = useState<AvailableProduct | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAvailableProduct();
        setProducts(data);
      } catch {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddIngredient = () => {
    if (selectedProduct && newIngredient.amount) {
      setIngredients([
        ...ingredients,
        { productId: selectedProduct.id, amount: newIngredient.amount }
      ]);
      setNewIngredient({ productId: null, amount: null });
      setSelectedProduct(null);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Malzemeler
      </Typography>

      {products.length === 0 ? (
        <Box sx={{ my: 2 }}>
          <Typography color="error">Ürün bulunamadı. Lütfen ürün ekleyin.</Typography>
          <Button variant="contained" onClick={() => navigate("/available-product-crud")}>
            Ürün Ekle
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <Autocomplete
            options={products}
            getOptionLabel={(option) => option.productName ?? ''}
            value={selectedProduct}
            onChange={(event, value) => {
              setSelectedProduct(value);
              setNewIngredient({
                ...newIngredient,
                productId: value?.id ?? null
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Ürün Seç" size="small" />
            )}
            sx={{ minWidth: 200 }}
          />
          <TextField
            label="Miktar"
            value={newIngredient.amount || ''}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, amount: e.target.value })
            }
            size="small"
          />
          <Button variant="outlined" onClick={handleAddIngredient}>
            Ekle
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {ingredients.map((ing, index) => {
          const productName = products.find(p => p.id === ing.productId)?.productName ?? 'Bilinmeyen';
          return (
            <Chip
              key={index}
              label={`Ürün: ${productName}, Miktar: ${ing.amount}`}
              onDelete={() => handleRemoveIngredient(index)}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default IngredientForm;
