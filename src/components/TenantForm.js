import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTenantById, createTenant, updateTenant } from '../services/apiLocatario';

const TenantForm = () => {
  const [tenant, setTenant] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTenant = async () => {
        const response = await getTenantById(id);
        setTenant(response.data);
      };

      fetchTenant();
    }
  }, [id]);

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateTenant(id, tenant);
    } else {
      await createTenant(tenant);
    }

    navigate('/tenants');
  };

  return (
    <div>
      <h2>{id ? 'Editar Locatário' : 'Adicionar Locatário'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="name" value={tenant.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={tenant.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" name="phone" value={tenant.phone} onChange={handleChange} required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default TenantForm;
