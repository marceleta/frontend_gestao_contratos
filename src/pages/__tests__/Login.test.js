import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Login from '../Login';

// Configurando o Mock Adapter para simular as requisições HTTP
const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.reset();
});

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);

    // Verificando se os elementos do formulário estão presentes
    expect(screen.getByLabelText(/Usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
  });

  test('shows error message when fields are empty', () => {
    render(<Login />);

    // Simulando o clique no botão de enviar com campos vazios
    fireEvent.click(screen.getByText(/Entrar/i));

    // Verificando se a mensagem de erro é exibida
    expect(screen.getByText('Todos os campos são obrigatórios')).toBeInTheDocument();
  });

  test('submits form with valid data and handles successful login', async () => {
    // Mock para window.location.href
    delete window.location;
    window.location = { href: '' };

    // Configurando o mock do axios
    const mock = new MockAdapter(axios);
    mock.onPost('http://localhost:8000/api/token/').reply(200, {
      access: 'mocked_access_token',
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Usuário/i), {
      target: { value: 'teste@exemplo.com' },
    });
    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText(/Entrar/i));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mocked_access_token');
    });

    expect(window.location.href).toBe('/home');
  });
});
