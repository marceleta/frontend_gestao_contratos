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
  // Estado para controlar a abertura do diálogo para adicionar uma nova coluna
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Estado para armazenar o nome da nova coluna
  const [newColumnName, setNewColumnName] = useState('');
  // Estado para armazenar o prazo de alerta da nova coluna
  const [alertDeadline, setAlertDeadline] = useState('');
  // Snackbar para exibir notificações
  const { enqueueSnackbar } = useSnackbar();
  // Estado para controlar a exibição do indicador de carregamento
  const [isLoading, setIsLoading] = useState(false);
  // Referência ao quadro do Kanban para controlar o scroll
  const boardRef = useRef(null);

  // Estado para controlar a abertura do diálogo para adicionar um novo card
  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  // Estado para armazenar os dados do novo card
  const [newCardData, setNewCardData] = useState({ lead_nome: '', contatos: [{ tipo: 'whatsapp', valor: '' }], descricao: '' });
  // Estado para armazenar o ID da coluna alvo onde o card será adicionado
  const [targetColumnId, setTargetColumnId] = useState(null);

  // Função para abrir o diálogo para adicionar um novo card em uma coluna específica
  const handleAddCardDialogOpen = (columnId) => {
    setTargetColumnId(columnId);
    setIsAddCardDialogOpen(true);
  };

  // Função para fechar o diálogo para adicionar um novo card
  const handleAddCardDialogClose = () => {
    setIsAddCardDialogOpen(false);
    setNewCardData({ lead_nome: '', contatos: [{ tipo: 'whatsapp', valor: '' }], descricao: '' });
  };

  // Função para adicionar um campo de contato adicional no card
  const handleAddContactField = () => {
    setNewCardData((prev) => ({
      ...prev,
      contatos: [...prev.contatos, { tipo: 'whatsapp', valor: '' }],
    }));
  };

  // Função para atualizar os campos de contato no card
  const handleContactChange = (index, key, value) => {
    setNewCardData((prev) => {
      const updatedContatos = [...prev.contatos];
      updatedContatos[index][key] = value;
      return { ...prev, contatos: updatedContatos };
    });
  };

  // Função para adicionar um novo card à coluna selecionada
  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`, // Gera um ID único para o card
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

  // Função para abrir o diálogo de adição de coluna
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Função para fechar o diálogo de adição de coluna
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewColumnName('');
    setAlertDeadline('');
  };

  // Função para mover um card entre colunas (ainda não implementada)
  const handleCardMove = (sourceColumnId, targetColumnId, cardId) => {
    console.log(`Movendo card ${cardId} de ${sourceColumnId} para ${targetColumnId}`);
  };

  // Função para excluir uma coluna
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

  // Função para validar os dados da nova coluna antes de adicioná-la
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

  // Função para salvar a nova coluna no backend
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

  // Função para adicionar a nova coluna ao estado local
  const addColumnToState = (coluna) => {
    const newColumn = {
      id: coluna.id,
      nome: coluna.nome,
      prazoAlerta: coluna.prazo_alerta,
      cards: [],
    };

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns.splice(1, 0, newColumn); // Adiciona a nova coluna na posição desejada
      return updatedColumns;
    });
  };

  // Função para adicionar uma nova coluna
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

  // Função para atualizar os dados de uma coluna existente
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

  // Função para tratar o evento de arrastar e soltar colunas
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

  // Função para rolar o quadro Kanban para a esquerda
  const scrollLeft = () => {
    if (boardRef.current) {
      boardRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Função para rolar o quadro Kanban para a direita
  const scrollRight = () => {
    if (boardRef.current) {
      boardRef.current.scrollTo({ left: boardRef.current.scrollWidth, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ p: 2, height: '555px', width: '100%', position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {/* Botão para adicionar uma nova coluna */}
        <AddButton onClick={handleOpenDialog} isLoading={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Adicionar Coluna'}
        </AddButton>

        {/* Modal para adicionar uma nova coluna */}
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

      {/* Botões de rolagem esquerda/direita para o quadro Kanban */}
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

      {/* Contexto de arrastar e soltar para organizar colunas */}
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
            {/* Renderizando cada coluna do Kanban */}
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

      {/* Diálogo para adicionar um novo card */}
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














