import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getClientes } from '../services/apiClientes';

const ClientesList = () => {
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getClientes(currentPage, searchQuery);
        setTenants(response.data.results);
        setTotalPages(response.data.total_pages || 1); // Evita erro se total_pages for undefined
      } catch (error) {
        console.error('Erro ao buscar locatários:', error);
        setError('Erro ao carregar locatários. Tente novamente.');
        setTenants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [currentPage, searchQuery]); // Agora a busca ocorre na API em tempo real

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reseta a paginação ao pesquisar
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ marginBottom: 2, marginTop: 4 }}>
        Locatários
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="new"
        >
          Adicionar
        </Button>
        <TextField
          label="Pesquisar"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: '40%' }}
        />
      </Box>

      {/* Mensagem de erro caso a API falhe */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loader enquanto os dados estão sendo carregados */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'primary.main', color: 'white', width: '25%' }}>
                  Nome
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'primary.main', color: 'white' }}>
                  Cidade
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'primary.main', color: 'white' }}>
                  Telefone
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'primary.main', color: 'white' }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'primary.main', color: 'white' }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tenants.length > 0 ? (
                tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell sx={{ width: '25%' }}>{tenant.nome}</TableCell>
                    <TableCell>{tenant.cidade}</TableCell>
                    <TableCell>
                      {tenant.telefones && tenant.telefones.length > 0
                        ? tenant.telefones.map((telefone) => (
                          <div key={telefone.numero}><span>{telefone.numero} ({telefone.tipo})</span></div>
                        ))
                        : 'N/D'}
                    </TableCell>
                    <TableCell>{tenant.email}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/clientes/${tenant.id}`}
                        variant="text"
                        color="primary"
                      >
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Nenhum locatário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default ClientesList;



