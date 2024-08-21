import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../HomePage';
import authService from '../../services/authService';

// Mocking authService to isolate the logout functionality
jest.mock('../../services/authService');

describe('HomePage Component', () => {
  const userName = 'Teste User';

  beforeEach(() => {
    // Reset mocks before each test to ensure clean test environment
    jest.clearAllMocks();
  });

  test('should render all main elements correctly', () => {
    render(<HomePage userName={userName} />);

    // Check if the logo is rendered
    expect(screen.getByAltText('PropertyHub Logo')).toBeInTheDocument();

    // Check if the system name is rendered
    expect(screen.getByText('PropertyHub')).toBeInTheDocument();

    // Check if the user's name is rendered
    expect(screen.getByText(userName)).toBeInTheDocument();

    // Check if the logout link is rendered
    expect(screen.getByText(/\(Logout\)/)).toBeInTheDocument();

    // Check if the burger menu is rendered
    expect(screen.getByLabelText('Menu Hamburguer')).toBeInTheDocument();
  });

  test('should toggle sidebar visibility when burger menu is clicked', () => {
    render(<HomePage userName={userName} />);

    const sidebar = screen.getByText('Dashboard').closest('div');

    // Initially, the sidebar should be hidden
    expect(sidebar).toHaveStyle('width: 0px');

    // Clicking the burger menu should open the sidebar
    fireEvent.click(screen.getByLabelText('Menu Hamburguer'));
    expect(sidebar).toHaveStyle('width: 250px');

    // Clicking again should close the sidebar
    fireEvent.click(screen.getByLabelText('Menu Hamburguer'));
    expect(sidebar).toHaveStyle('width: 0px');
  });

  test('should call logout function when logout link is clicked', () => {
    render(<HomePage userName={userName} />);

    // Simulate clicking the logout link
    fireEvent.click(screen.getByText('/\(Logout\)/'));

    // Verify if the logout function was called
    expect(authService.logout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
