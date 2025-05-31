import React, { useState } from 'react';
import styled from 'styled-components';
import DogLogo from '../assets/dog-logo.svg';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Bg = styled.div`
  min-height: 100vh;
  background: #fffbe6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background: #fffbe6;
  border-radius: 32px;
  box-shadow: 0 2px 16px #e0b00022;
  padding: 40px 36px 32px 36px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #f5e2c0;
`;

const Logo = styled.img`
  width: 80px;
  margin-bottom: 18px;
`;

const Title = styled.h1`
  color: #7a4a0a;
  font-family: 'Quicksand', Arial, sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 32px 0;
`;

const InputBox = styled.div`
  width: 100%;
  background: #fff6dc;
  border-radius: 18px;
  border: 2px solid #f5e2c0;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  padding: 0 18px;
  height: 54px;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 20px;
  color: #7a4a0a;
  flex: 1;
  margin-left: 14px;
  font-family: 'Quicksand', Arial, sans-serif;
`;

const RegisterButton = styled.button`
  width: 100%;
  background: #e08a3a;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  border: none;
  border-radius: 24px;
  padding: 12px 0;
  margin-top: 10px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px #e0b00033;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #b97a2a;
  }
`;

const BottomText = styled.div`
  margin-top: 24px;
  color: #7a4a0a;
  font-size: 20px;
  text-align: center;
`;

const LoginLink = styled.span`
  color: #b97a2a;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 4px;
`;

const ErrorMsg = styled.div`
  color: #e05a3a;
  font-size: 17px;
  margin-bottom: 8px;
  margin-top: -8px;
  min-height: 22px;
`;

function getUsers() {
  const key = 'lucabubu_users';
  const users = localStorage.getItem(key);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users: any[]) {
  localStorage.setItem('lucabubu_users', JSON.stringify(users));
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    const users = getUsers();
    if (users.find((u: any) => u.username === username)) {
      setError('Username already exists');
      return;
    }
    users.push({ username, password });
    saveUsers(users);
    localStorage.setItem('lucabubu_loggedin', JSON.stringify({ username }));
    window.location.href = '/';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Bg>
      <Logo src={DogLogo} alt="logo" />
      <Title>Sign Up</Title>
      <Card as="form" onSubmit={handleRegister}>
        <InputBox>
          <FaEnvelope color="#b97a2a" size={22} />
          <Input placeholder="Email or username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </InputBox>
        <InputBox>
          <FaLock color="#b97a2a" size={22} />
          <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </InputBox>
        <ErrorMsg>{error}</ErrorMsg>
        <RegisterButton type="submit">Sign up</RegisterButton>
      </Card>
      <BottomText>
        Already have an account?
        <LoginLink onClick={handleLogin}>Log in</LoginLink>
      </BottomText>
    </Bg>
  );
};

export default Register; 