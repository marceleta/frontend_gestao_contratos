import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, useTheme, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button, TextField, Fade } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import KanbanCard from './KanbanCard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const KanbanColumn = ({ column, onCardMove, onRemoveColumn, onUpdateColumn, onAddCard }) => {
  const theme = useTheme(); // Acessa o tema do sistema
  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar o Menu
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false); // Estado para controlar o Dialog de configurações
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Estado para controlar o Dialog de exclusão
  const [prazoAlerta, setPrazoAlerta] = useState(column.prazo_alerta ?? 0); // Estado para controlar o prazo de alerta da coluna
  const [isHovered, setIsHovered] = useState(false); // Estado para controlar quando a coluna está sendo "hovered"

  // DnD Kit Sortable
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Função para dividir o título em linhas menores
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

  // Função para abrir o Menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o Menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Função para abrir o Dialog de configurações
  const handleOpenConfigDialog = () => {
    setIsConfigDialogOpen(true);
    handleCloseMenu();
  };

  // Função para fechar o Dialog de configurações
  const handleCloseConfigDialog = () => {
    setIsConfigDialogOpen(false);
  };

  // Função para abrir o Dialog de exclusão
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseMenu();
  };

  // Função para fechar o Dialog de exclusão
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Função para lidar com a exclusão da coluna
  const handleDeleteColumn = () => {
    onRemoveColumn(column.id);
    handleCloseDeleteDialog();
  };

  // Função para lidar com a atualização da coluna
  const handleUpdateColumn = () => {
    onUpdateColumn(column.id, { prazo_alerta: parseInt(prazoAlerta, 10) });
    handleCloseConfigDialog();
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      sx={{
        p: 1,
        minWidth: 220,
        minHeight: '55vh',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
      }}
      onMouseEnter={() => setIsHovered(true)} // Quando o mouse entra na coluna
      onMouseLeave={() => setIsHovered(false)} // Quando o mouse sai da coluna
    >
      {/* Botão de Configurações no canto superior direito */}
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: 3,
          right: 2,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={handleOpenMenu}
      >
        <SettingsIcon fontSize="small" />
      </IconButton>

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

      {/* Nome da Coluna */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          textAlign: 'center',
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 1,
          wordBreak: 'break-all',
          whiteSpace: 'pre-line',
          p: 1,
          cursor: 'grab',
        }}
        {...attributes}
        {...listeners}
      >
        {splitTitle(column.nome)}
      </Typography>

      {/* Cards na Coluna */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} columnId={column.id} onMove={onCardMove} />
        ))}
      </Box>

      {/* Botão para adicionar card na coluna, visível apenas no hover */}
      <Fade in={isHovered}>
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkgreen',
            },
          }}
          onClick={() => onAddCard(column.id)}
        >
          <AddIcon />
        </IconButton>
      </Fade>
    </Paper>
  );
};

export default KanbanColumn;
























