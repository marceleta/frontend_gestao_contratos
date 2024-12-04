// components/AddColumnModal.js

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddColumnModal = ({ isOpen, onClose, onAddColumn, newColumnName, setNewColumnName, alertDeadline, setAlertDeadline }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Adicionar Nova Coluna</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome da Coluna"
          type="text"
          fullWidth
          variant="outlined"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Prazo de Alerta (em horas)"
          type="number"
          fullWidth
          variant="outlined"
          value={alertDeadline}
          onChange={(e) => setAlertDeadline(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onAddColumn} color="primary" disabled={newColumnName.trim() === '' || alertDeadline.trim() === ''}>
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddColumnModal;
