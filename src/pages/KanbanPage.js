import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
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
        p: 1,
        mt: 1,
        width: '100%', // Define a largura máxima do conteúdo
        height: '100%',
        overflow: 'hidden', // Evita barras de rolagem desnecessárias
        margin: '0 auto', // Centraliza o conteúdo na tela
        boxShadow: 10, // Adiciona uma sombra para destacar o conteúdo
        backgroundColor: '#f0f0f0', // Define um fundo branco para o contêiner principal
        borderRadius: 2, // Adiciona bordas arredondadas para um visual mais suave
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
        Quadro Kanban
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'hidden', // Evita overflow do KanbanBoard
          pb: 1, // Padding inferior para evitar que o conteúdo encoste na borda
        }}
      >
        <Box sx={{ flexGrow: 1, flexDirection: 'column', display: 'flex', height: '100%', p: 1 }}>
          <KanbanBoard columns={columns} setColumns={setColumns} />
        </Box>
      </Box>
    </Box>
  );
};

export default KanbanPage;

