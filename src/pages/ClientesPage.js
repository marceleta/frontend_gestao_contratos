import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientesList from '../components/ClientesList';
import ClientesForm from '../components/ClientesForm';
import ClientesDetail from '../components/ClientesDetail';

const ClientesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientesList />} />
      <Route path="new" element={<ClientesForm />} />
      <Route path=":id" element={<ClientesDetail />} />
      <Route path="edit/:id" element={<ClientesForm />} />
    </Routes>
  );
};

export default ClientesPage;
