import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { IConfirmationDialogProps } from '../types/coffeeTypes';

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
    open,
    title,
    message,
    onConfirm,
    onCancel
}) => {
    return (
        <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onCancel} color="secondary" variant="outlined">
                    İptal
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained">
                    Onayla
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;