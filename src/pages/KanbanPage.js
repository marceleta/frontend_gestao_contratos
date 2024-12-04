import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import KanbanBoard from '../components/KanbanBoard'; // Criar este componente
import kanbanService from '../services/kanbanService'; // Criar serviço para consumir API

const KanbanPage = () => {
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKanbanData = async () => {
      try {
        const data = await kanbanService.getKanbanData(); // Obter dados do backend
        console.log('KanbanPage useEffect data: ' + JSON.stringify(data))
        //console.log('Kanban id: ' + JSON.stringify(data['kanban']['id']))
        setColumns(data.colunas); // Assumindo que a API retorna colunas e cards
      } catch (error) {
        console.error('Erro ao carregar dados do Kanban:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKanbanData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 'none',
        width: '100%', // Define a largura máxima do conteúdo
        margin: '0 auto', // Centraliza o conteúdo na tela
        boxShadow: 1, // Adiciona uma sombra para destacar o conteúdo
        backgroundColor: '#f0f0f0', // Define um fundo branco para o contêiner principal
        borderRadius: 2, // Adiciona bordas arredondadas para um visual mais suave
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Quadro Kanban
      </Typography>
      <Box
        sx={{
          overflowX: 'auto',
          width: '100%',
          pb: 2, // Padding inferior para evitar que o conteúdo encoste na borda
        }}
      >
        <Grid container spacing={1} sx={{ width: '100%' }}>
          <KanbanBoard columns={columns} setColumns={setColumns} />
        </Grid>
      </Box>
    </Box>
  );
};

export default KanbanPage;

