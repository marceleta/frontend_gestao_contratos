import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ onClick, children, variant = 'default' }) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

const buttonStyles = {
  salvar: css`
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  `,
  cancelar: css`
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #da190b;
    }
  `,
  pesquisar: css`
    background-color: #2196f3;
    color: white;
    &:hover {
      background-color: #0b7dda;
    }
  `,
  default: css`
    background-color: #e0e0e0;
    color: black;
    &:hover {
      background-color: #d5d5d5;
    }
  `,
};

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  ${({ variant }) => buttonStyles[variant] || buttonStyles.default}
`;

export default Button;