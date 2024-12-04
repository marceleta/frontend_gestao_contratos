import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const KanbanCard = ({ card, columnId, onMove }) => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData('cardId', card.id);
    event.dataTransfer.setData('sourceColumnId', columnId);
  };

  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: 'background.default',
        boxShadow: 2,
        cursor: 'grab',
      }}
      draggable
      onDragStart={handleDragStart}
    >
      <Typography variant="body1">{card.title}</Typography>
    </Paper>
  );
};

export default KanbanCard;
