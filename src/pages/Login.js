import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Faz com que o contêiner ocupe toda a altura da viewport */
  background-color: #f4f4f4; /* Cor de fundo opcional */
`;

const LoginContainer = styled.div`
  max-width: 300px;
  width: 100%; /* Para garantir que não ultrapasse o tamanho máximo */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white; /* Cor de fundo do contêiner de login */
  text-align: center;
`;

const LoginTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Logo = styled.img`
  width: 90px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Todos os campos são obrigatórios');
      return;
    }

    try {
      await authService.login(username, password); // Use o serviço de autenticação para o login
      window.location.href = '/home';
    } catch (error) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Logo src={logo} alt="PropertyHub Logo" />
        <LoginTitle>Login</LoginTitle>
        <form onSubmit={handleSubmit}>
          <InputField
            id="username"
            label="Usuário"
            type="text"
            placeholder="Digite seu usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            id="password"
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="salvar" type="submit">
            Entrar
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;