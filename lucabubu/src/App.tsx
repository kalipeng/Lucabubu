import React from 'react';
import styled from 'styled-components';
import Map from './components/Map';

const AppContainer = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header>
        lucabubu - Bellevue Dog Parks & Trails
      </Header>
      <Map />
    </AppContainer>
  );
};

export default App;
