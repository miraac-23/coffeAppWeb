import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider, Box } from '@mui/material';
import { IOrderDetailsDialogProps } from '../types/coffeeTypes';

const OrderDetailsDialog: React.FC<IOrderDetailsDialogProps> = ({
    open,
    handleClose,
    orderData
}) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Sipariş Detayları</DialogTitle>
            <DialogContent>
                {orderData ? (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {orderData.coffeeName}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Toplam Fiyat: {orderData.price} ₺
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" gutterBottom>
                            Malzemeler:
                        </Typography>
                        <Box sx={{ pl: 2 }}>
                            {orderData.items.map((item, index) => (
                                <Typography key={index}>
                                    {item.productName} - {item.amount}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <Typography>Bilgi bulunamadı</Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Kapat
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetailsDialog;