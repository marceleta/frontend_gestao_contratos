import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClientesDetail = () => {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      const response = await axios.get(`/api/clientes/${id}/`);
      setTenant(response.data);
    };

    fetchTenant();
  }, [id]);

  if (!tenant) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes do Locatário</h2>
      <p><strong>Nome:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Telefone:</strong> {tenant.phone}</p>
    </div>
  );
};

export default ClientesDetail;
