import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, useTheme, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import KanbanCard from './KanbanCard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const KanbanColumn = ({ column, onCardMove, onRemoveColumn, onUpdateColumn, onAddCard }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [prazoAlerta, setPrazoAlerta] = useState(column.prazo_alerta ?? 0);

  // DnD Kit Sortable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenConfigDialog = () => {
    setIsConfigDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseConfigDialog = () => {
    setIsConfigDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteColumn = () => {
    onRemoveColumn(column.id);
    handleCloseDeleteDialog();
  };

  const handleUpdateColumn = () => {
    onUpdateColumn(column.id, { prazo_alerta: parseInt(prazoAlerta, 10) });
    handleCloseConfigDialog();
  };

  const splitTitle = (title, maxLength = 20) => {
    const words = title.split(' ');
    let result = '';
    let currentLine = '';

    words.forEach((word) => {
      if ((currentLine + word).length > maxLength) {
        result += currentLine.trim() + '\n';
        currentLine = word + ' ';
      } else {
        currentLine += word + ' ';
      }
    });

    result += currentLine.trim();
    return result;
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 0.5,
        minWidth: '20%',
        height: '100%',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      {/* Título e botões no topo da coluna */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center', // Alinha os itens verticalmente ao centro
          justifyContent: 'space-between', // Distribui o espaço entre o nome e os ícones
          height: '10%',
          padding: '0.5rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: 1,
        }}
      >
        {/* Nome da Coluna */}
        <Typography
          variant="h8"
          sx={{
            textAlign: 'center',
            cursor: 'pointer', // Adiciona o cursor de mão
            whiteSpace: 'normal',
            wordBreak: 'break-word', // Quebra palavras muito longas
            fontSize: '12px',
            flexGrow: 1, // Faz com que o nome ocupe o espaço restante entre os botões
          }}
          {...attributes}
          {...listeners}
        >
          {splitTitle(column.nome)}
        </Typography>

        {/* Botões de Configurações e Adicionar Card */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={handleOpenMenu}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              color: theme.palette.primary.contrastText,
              fontSize: '16px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
            onClick={() => onAddCard(column.id)}
          >
            ✚
          </IconButton>
        </Box>
      </Box>

      {/* Menu de Configurações */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenConfigDialog}>Configurações</MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ color: 'error.main' }}>
          Deletar
        </MenuItem>
      </Menu>

      {/* Dialog de Configurações da Coluna */}
      <Dialog open={isConfigDialogOpen} onClose={handleCloseConfigDialog}>
        <DialogTitle>Configurações da Coluna</DialogTitle>
        <Box sx={{ p: 3 }}>
          <TextField
            label="Prazo de Alerta (em horas)"
            type="number"
            value={prazoAlerta}
            onChange={(e) => setPrazoAlerta(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Box>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateColumn} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Tem certeza que deseja deletar esta coluna?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteColumn} color="error">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cards na Coluna */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, overflowY: 'auto' }}>
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} columnId={column.id} onMove={onCardMove} />
        ))}
      </Box>
    </Paper>
  );
};

export default KanbanColumn;



























