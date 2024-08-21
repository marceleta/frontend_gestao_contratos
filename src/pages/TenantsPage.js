import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TenantsList from '../components/TenantsList';
import TenantForm from '../components/TenantForm';
import TenantDetail from '../components/TenantDetail';

const TenantsPage = () => {
  return (
    <Routes>
      <Route path="/" element={<TenantsList />} />
      <Route path="new" element={<TenantForm />} />
      <Route path=":id" element={<TenantDetail />} />
      <Route path="edit/:id" element={<TenantForm />} />
    </Routes>
  );
};

export default TenantsPage;
