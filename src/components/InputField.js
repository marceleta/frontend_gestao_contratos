import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const InputField = ({ label, type, placeholder, value, onChange, id }) => {
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default InputField;