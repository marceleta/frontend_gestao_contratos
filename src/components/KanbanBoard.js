import React, { useState, useRef } from 'react';
import { Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KanbanColumn from './KanbanColumn';
import AddColumnModal from './AddColumnModal';
import kanbanService from '../services/kanbanService';
import { useSnackbar } from 'notistack';
import AddButton from '../components/AddButton';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const KanbanBoard = ({ columns, setColumns }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [alertDeadline, setAlertDeadline] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const boardRef = useRef(null);

  // Estado para adicionar um novo card
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  const [newCardData, setNewCardData] = useState({ lead_nome: '', contatos: [{ tipo: 'whatsapp', valor: '' }], descricao: '' });
  const [targetColumnId, setTargetColumnId] = useState(null);

  const handleAddCardDialogOpen = (columnId) => {
    setTargetColumnId(columnId);
    setIsAddCardDialogOpen(true);
  };

  const handleAddCardDialogClose = () => {
    setIsAddCardDialogOpen(false);
    setNewCardData({ lead_nome: '', contatos: [{ tipo: 'whatsapp', valor: '' }], descricao: '' });
  };

  const handleAddContactField = () => {
    setNewCardData((prev) => ({
      ...prev,
      contatos: [...prev.contatos, { tipo: 'whatsapp', valor: '' }],
    }));
  };

  const handleContactChange = (index, key, value) => {
    setNewCardData((prev) => {
      const updatedContatos = [...prev.contatos];
      updatedContatos[index][key] = value;
      return { ...prev, contatos: updatedContatos };
    });
  };

  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      ...newCardData,
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === targetColumnId
          ? {
            ...column,
            cards: [...column.cards, newCard],
          }
          : column
      )
    );

    enqueueSnackbar('Card adicionado com sucesso!', { variant: 'success' });
    handleAddCardDialogClose();
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewColumnName('');
    setAlertDeadline('');
  };

  const handleCardMove = (sourceColumnId, targetColumnId, cardId) => {
    console.log(`Movendo card ${cardId} de ${sourceColumnId} para ${targetColumnId}`);
  };

  const handleColumnDelete = async (columnId) => {
    try {
      setIsLoading(true);
      await kanbanService.removeColumn(columnId);
      setColumns((prevColumns) => prevColumns.filter((column) => column.id !== columnId));
      enqueueSnackbar('Coluna removida com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao remover a coluna. Verifique se não há cards na coluna e tente novamente.', { variant: 'error' });
      console.error('Erro ao remover a coluna:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateNewColumn = () => {
    if (!newColumnName.trim()) {
      enqueueSnackbar('O nome da coluna não pode estar vazio!', { variant: 'warning' });
      return false;
    }
    if (!alertDeadline.trim()) {
      enqueueSnackbar('O prazo de alerta não pode estar vazio!', { variant: 'warning' });
      return false;
    }
    return true;
  };

  const saveColumnToBackend = async () => {
    const dataColumn = {
      'kanban_id': localStorage.getItem('kanban_id'),
      'nome': newColumnName,
      'prazo_alerta': alertDeadline,
      'posicao': 2,
    };

    try {
      const response = await kanbanService.createColumn(dataColumn);
      return response.coluna;
    } catch (error) {
      enqueueSnackbar('Erro ao criar a coluna. Tente novamente.', { variant: 'error' });
      console.error(error);
      return null;
    }
  };

  const addColumnToState = (coluna) => {
    const newColumn = {
      id: coluna.id,
      nome: coluna.nome,
      prazoAlerta: coluna.prazo_alerta,
      cards: [],
    };

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(1, 0, newColumn);
      return updatedColumns;
    });
  };

  const handleAddColumn = async () => {
    if (!validateNewColumn()) return;

    setIsLoading(true);
    const coluna = await saveColumnToBackend();

    if (coluna) {
      addColumnToState(coluna);
      handleCloseDialog();
      enqueueSnackbar('Coluna adicionada com sucesso!', { variant: 'success' });
    }

    setIsLoading(false);
  };

  const handleUpdateColumn = async (columnId, updatedData) => {
    try {
      setIsLoading(true);
      await kanbanService.updateColumn(columnId, updatedData);

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === columnId ? { ...column, ...updatedData } : column
        )
      );

      enqueueSnackbar('Coluna atualizada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao atualizar a coluna. Tente novamente.', { variant: 'error' });
      console.error('Erro ao atualizar a coluna:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over === null) {
      return;
    }

    if (active.id !== over.id) {
      setColumns((columns) => {
        const oldIndex = columns.findIndex((col) => col.id === active.id);
        const newIndex = columns.findIndex((col) => col.id === over.id);
        return arrayMove(columns, oldIndex, newIndex);
      });
    }
  };

  const scrollLeft = () => {
    if (boardRef.current) {
      boardRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (boardRef.current) {
      boardRef.current.scrollTo({ left: boardRef.current.scrollWidth, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ p: 2, height: '555px', width: '100%', position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <AddButton onClick={handleOpenDialog} isLoading={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Adicionar Coluna'}
        </AddButton>

        <AddColumnModal
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onAddColumn={handleAddColumn}
          newColumnName={newColumnName}
          setNewColumnName={setNewColumnName}
          alertDeadline={alertDeadline}
          setAlertDeadline={setAlertDeadline}
        />
      </Box>

      <IconButton
        sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        onClick={scrollLeft}
      >
        <ArrowBackIosIcon />
      </IconButton>

      <IconButton
        sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        onClick={scrollRight}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
          <Box
            ref={boardRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              overflowY: 'hidden',
              p: 0,
              paddingBottom: 2,
              whiteSpace: 'nowrap',
              width: '100%',
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onCardMove={handleCardMove}
                onRemoveColumn={handleColumnDelete}
                onUpdateColumn={handleUpdateColumn}
                onAddCard={handleAddCardDialogOpen}
              />
            ))}
          </Box>
        </SortableContext>
      </DndContext>

      {/* Dialog para adicionar novo card */}
      <Dialog open={isAddCardDialogOpen} onClose={handleAddCardDialogClose}>
        <DialogTitle>Adicionar Novo Card</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome do Lead"
            value={newCardData.lead_nome}
            onChange={(e) => setNewCardData((prev) => ({ ...prev, lead_nome: e.target.value }))}
            fullWidth
            margin="dense"
          />
          <Box sx={{ mb: 2 }}>
            {newCardData.contatos.map((contato, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  select
                  label="Tipo"
                  value={contato.tipo}
                  onChange={(e) => handleContactChange(index, 'tipo', e.target.value)}
                  sx={{ width: '150px', mr: 1 }}
                >
                  <MenuItem value="whatsapp">WhatsApp</MenuItem>
                  <MenuItem value="telefone_comercial">Telefone Comercial</MenuItem>
                  <MenuItem value="telefone_celular">Celular</MenuItem>
                  <MenuItem value="email">E-mail</MenuItem>
                </TextField>
                <TextField
                  label="Contato"
                  value={contato.valor}
                  onChange={(e) => handleContactChange(index, 'valor', e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton onClick={handleAddContactField} color="primary" sx={{ ml: 1 }}>
                  <AddIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <TextField
            label="Descrição"
            value={newCardData.descricao}
            onChange={(e) => setNewCardData((prev) => ({ ...prev, descricao: e.target.value }))}
            fullWidth
            multiline
            rows={4}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCardDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddCard} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KanbanBoard;













