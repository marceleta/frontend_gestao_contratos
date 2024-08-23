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
} from '@mui/material';
import { getTenants } from '../services/apiLocatario';

const TenantsList = () => {
  const [tenants, setTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await getTenants(currentPage);
        setTenants(response.data.results);
        setTotalPages(response.data.total_pages); // Assumindo que a API retorna o total de páginas
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar locatários:', error);
        setTenants([]);
      }
    };

    fetchTenants();
  }, [currentPage]); // Recarrega os dados quando a página atual muda

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredTenants = tenants.filter((tenant) =>
    tenant.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          to="/tenants/new"
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
            {filteredTenants.map((tenant) => (
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
                    to={`/tenants/${tenant.id}`}
                    variant="text"
                    color="primary"
                  >
                    Ver Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default TenantsList;


