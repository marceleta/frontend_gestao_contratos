import axios from 'axios';

const API_URL_KANBAN = 'http://localhost:8000/api/v1/kanban';
const API_URL_ADD_COLUMN = 'http://localhost:8000/api/v1/kanbancolumnorder/criar_coluna_e_ordem/';
const API_URL_REMOVE_COLUMN = 'http://localhost:8000/api/v1/kanbancolumnorder';
const API_URL_UPDATE_COLUMN = 'http://localhost:8000/api/v1/colunas';

const getKanbanData = async () => {
  try {
    // Obtém o ID do usuário armazenado no localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID do usuário não encontrado no localStorage.');
    }

    // Faz a requisição com o ID do usuário na URL
    const response = await axios.get(`${API_URL_KANBAN}/${userId}/colunas_e_cards/`);
    //console.log('Kanban data:', response.data);
    localStorage.setItem('kanban_id', response.data['kanban']['id'])

    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error('Erro ao buscar os dados do Kanban:', error);
    throw error;
  }
};

// Método para criar uma nova coluna
const createColumn = async (columnData) => {
  //console.log('createColumn: ' + JSON.stringify(columnData))
  try {
    // Obtém o ID do usuário armazenado no localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('ID do usuário não encontrado no localStorage.');
    }

    // Faz a requisição POST para criar uma nova coluna
    const response = await axios.post(`${API_URL_ADD_COLUMN}`, columnData);
    console.log('Coluna criada:', response.data);

    return response.data; // Retorna os dados da coluna criada
  } catch (error) {
    console.error('Erro ao criar a coluna:', error);
    throw error;
  }
};

// Método para remover uma coluna
const removeColumn = async (columnId) => {
  try {
    //console.log(`ColumnId: ${columnId}`)
    // Faz a requisição DELETE para remover a coluna
    const response = await axios.delete(`${API_URL_REMOVE_COLUMN}/${columnId}/remover_coluna/`);
    //console.log('Coluna removida:', response.data);

    return response.data; // Retorna os dados da resposta da remoção
  } catch (error) {
    console.error('Erro ao remover a coluna:', error);
    throw error;
  }
};

// Método para atualizar uma coluna
const updateColumn = async (columnId, updateData) => {
  try {
    // Faz a requisição PATCH para atualizar a coluna
    const response = await axios.patch(`${API_URL_UPDATE_COLUMN}/${columnId}/atualizar_nome_ou_prazo/`, updateData);
    console.log('Coluna atualizada:', response.data);

    return response.data; // Retorna os dados da coluna atualizada
  } catch (error) {
    console.error('Erro ao atualizar a coluna:', error);
    throw error;
  }
};

// eslint-disable-next-line
export default {
  getKanbanData,
  createColumn,
  removeColumn,
  updateColumn
};
