import React, { useState } from 'react';
import styled from 'styled-components';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import TenantsPage from './TenantsPage';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
`;

const Logo = styled.img`
  height: 50px;
`;

const SystemName = styled.h1`
  margin-left: 10px;
  font-size: 24px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserName = styled.div`
  font-size: 18px;
`;

const LogoutLink = styled.a`
  font-size: 16px;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: ${({ $isOpen }) => ($isOpen ? '120px' : '0')};
  background-color: #f4f4f4;
  padding: ${({ $isOpen }) => ($isOpen ? '20px' : '0')};
  overflow: hidden;
  transition: width 0.3s, padding 0.3s;
`;

const DropdownMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  li {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
`;

const BurgerMenuWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 1000;
`;

const BurgerMenu = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  span {
    display: block;
    height: 3px;
    background-color: #007BFF;
    border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }
  span:nth-child(1) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(12px)' : 'none')};
  }
  span:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  }
  span:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-12px)' : 'none')};
  }
`;

const HomePage = ({ userName }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <PageContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo src={logo} alt="PropertyHub Logo" />
          <SystemName>PropertyHub</SystemName>
        </div>
        <UserContainer>
          <UserName>{userName}</UserName>
          <LogoutLink onClick={handleLogout}>(Logout)</LogoutLink>
        </UserContainer>
      </Header>
      <BurgerMenuWrapper>
        <BurgerMenu isOpen={isSidebarOpen} onClick={toggleSidebar} aria-label="Menu Hamburguer">
          <span></span>
          <span></span>
          <span></span>
        </BurgerMenu>
      </BurgerMenuWrapper>
      <Content>
        <Sidebar $isOpen={isSidebarOpen}>
          <DropdownMenu>
            <li>Dashboard</li>
            <li>Propriedades</li>
            <li><Link to="tenants">Locatários</Link></li>
            <li>Configurações</li>
          </DropdownMenu>
        </Sidebar>
        <MainContent>
          <Routes>
            <Route path="tenants/*" element={<TenantsPage />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </MainContent>
      </Content>
    </PageContainer>
  );
};

export default HomePage;

