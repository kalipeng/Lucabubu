import React, { useState } from 'react';
import styled from 'styled-components';
import LogoSvg from '../assets/Logo/SVG/Logo.svg';
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
  height: auto;
  display: block;
  margin: 0 auto 18px auto;
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

const LoginButton = styled.button`
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

const SignUp = styled.span`
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

// 初始化预设用户
function initDefaultUsers() {
  const key = 'lucabubu_users';
  if (!localStorage.getItem(key)) {
    const users = [
      { username: 'user1', password: '123456' },
      { username: 'user2', password: 'abcdef' },
      { username: 'test', password: 'test123' },
    ];
    localStorage.setItem(key, JSON.stringify(users));
  }
}

function getUsers() {
  const key = 'lucabubu_users';
  const users = localStorage.getItem(key);
  return users ? JSON.parse(users) : [];
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    initDefaultUsers();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find((u: any) => u.username === username);
    if (!user) {
      setError('User not found');
      return;
    }
    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }
    // 登录成功
    localStorage.setItem('lucabubu_loggedin', JSON.stringify({ username }));
    window.location.href = '/';
  };

  const handleSignUp = () => {
    window.location.href = '/register';
  };

  return (
    <Bg>
      <Logo src={LogoSvg} alt="logo" />
      <Title>LucaBubu</Title>
      <Card as="form" onSubmit={handleLogin}>
        <InputBox>
          <FaEnvelope color="#b97a2a" size={22} />
          <Input placeholder="Email or username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </InputBox>
        <InputBox>
          <FaLock color="#b97a2a" size={22} />
          <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </InputBox>
        <ErrorMsg>{error}</ErrorMsg>
        <LoginButton type="submit">Log in</LoginButton>
      </Card>
      <BottomText>
        Don't have an account?
        <SignUp onClick={handleSignUp}>Sign up</SignUp>
      </BottomText>
    </Bg>
  );
};

export default Login; 