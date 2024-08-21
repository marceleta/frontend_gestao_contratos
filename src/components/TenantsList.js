import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getTenants } from '../services/apiLocatario'; // Supondo que você tenha uma função para chamar a API

const TenantsListContainer = styled.div`
  margin: 20px;
`;

const TenantInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const TenantList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TenantItem = styled.li`
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TenantName = styled.span`
  font-size: 16px;
  color: #333;
`;

const AddButton = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const TenantDetails = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;

  span {
    display: block;
    margin-bottom: 5px;
  }
`;

const TenantTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #f9f9f9;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #007BFF;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  a {
    color: #007BFF;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TenantsList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await getTenants();
        setTenants(response.data.results);
        console.log(response.data.results)
      } catch (error) {
        console.error('Erro ao buscar locatários:', error);
        setTenants([]);
      }
    };

    fetchTenants();
  }, []);

  return (
    <TenantsListContainer>
      <Title>Locatários</Title>

      <TenantTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.nome}</td>
              <td>{tenant.cidade}</td>
              <td>{tenant.endereco}, {tenant.bairro}</td>
              <td>{tenant.telefones.find(tel => tel.tipo === tenant.preferencia_comunicacao)?.numero || 'N/D'}</td>
              <td>{tenant.email}</td>
              <td><Link to={`/tenants/${tenant.id}`}>Ver Detalhes</Link></td>
            </tr>
          ))}
        </tbody>
      </TenantTable>
      <AddButton to="/tenants/new">Adicionar Locatário</AddButton>
    </TenantsListContainer>
  );
};

export default TenantsList;


