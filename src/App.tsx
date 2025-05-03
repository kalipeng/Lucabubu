import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Map from './components/Map';
import Logo from './assets/Logo/SVG/Logo.svg';
import Banner1 from './assets/1.png';
import PawSVG from './assets/paw.png';
import PlaceList from './components/PlaceList';
import { FaUsers, FaPlus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Quicksand', Arial, sans-serif;
  }
`;

const AppContainer = styled.div`
  text-align: center;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const LogoImg = styled.img`
  height: 48px;
`;

const CornerIllustration = styled.img`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 180px;
  opacity: 0.9;
  z-index: 10;
  pointer-events: none;
`;

const FooterDecoration = styled.img`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 60px;
  opacity: 0.5;
  pointer-events: none;
`;

const MainLayout = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f7fa;
`;

const TeamUpFab = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #2563ff;
  color: #fff;
  border: none;
  box-shadow: 0 4px 24px #2563ff55;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2000;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px #2563ff99;
    transform: scale(1.08);
  }
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 2100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 48px #2563ff33;
  padding: 32px 24px 64px 24px;
  min-width: 340px;
  max-width: 90vw;
  min-height: 320px;
  position: relative;
`;

const AddFab = styled.button`
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2563ff;
  color: #fff;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px #2563ff33;
  cursor: pointer;
  z-index: 2200;
`;

const demoTeams = [
  {
    id: 1,
    time: 'Sat 10:00 AM',
    location: 'Cougar Mountain Trailhead',
    detail: 'Host: Alice\nDog: Social, playful\nContact: WeChat\nPace: Leisurely\nSnacks: Yes\nGames: Frisbee\nNotes: Looking for friendly dogs!',
  },
  {
    id: 2,
    time: 'Sun 2:00 PM',
    location: 'Bellevue Downtown Park',
    detail: 'Host: Bob\nDog: Shy, quiet\nContact: Telegram\nPace: Slow walk\nSnacks: No\nGames: None\nNotes: Prefer small group.',
  },
  {
    id: 3,
    time: 'Fri 6:30 PM',
    location: 'Lake Hills Greenbelt',
    detail: 'Host: Carol\nDog: Energetic\nContact: Phone\nPace: Fast walk\nSnacks: Yes\nGames: Ball fetch\nNotes: Open to all!',
  },
];

type Team = {
  id: number;
  time: string;
  location: string;
  detail: string;
};

interface TeamUpCardProps {
  team: Team;
  expanded: boolean;
  onClick: () => void;
  onJoin: (id: number) => void;
}

const TeamUpCard: React.FC<TeamUpCardProps> = ({ team, expanded, onClick, onJoin }) => (
  <div style={{
    background: '#f5f7fa', borderRadius: 16, margin: '16px 0', padding: 16, boxShadow: expanded ? '0 4px 24px #2563ff33' : '0 2px 8px #2563ff11', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s', fontFamily: 'Quicksand, Arial, sans-serif'
  }} onClick={onClick}>
    <div style={{ fontWeight: 700, color: '#2563ff', fontSize: 18 }}>{team.time}</div>
    <div style={{ color: '#333', marginBottom: 8 }}>{team.location}</div>
    {expanded && (
      <div style={{ whiteSpace: 'pre-line', color: '#222', margin: '8px 0 0 0' }}>
        {team.detail}
        <button style={{ marginTop: 12, background: '#2563ff', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); onJoin(team.id); }}>Join</button>
      </div>
    )}
  </div>
);

const TeamUpList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  return (
    <div>
      {demoTeams.map(team => (
        <TeamUpCard
          key={team.id}
          team={team}
          expanded={expandedId === team.id}
          onClick={() => setExpandedId(expandedId === team.id ? null : team.id)}
          onJoin={(id: number) => alert('Joined team ' + id)}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [teamUpOpen, setTeamUpOpen] = useState(false);

  return (
    <AppContainer>
      <GlobalStyle />
      <NavBar>
        <LogoImg src={Logo} alt="lucabubu logo" />
      </NavBar>
      <CornerIllustration src={Banner1} alt="Dog cartoon" />
      <MainLayout>
        <PlaceList
          places={places}
          selectedPlaceId={selectedPlaceId}
          onSelect={setSelectedPlaceId}
        />
        <Map
          selectedPlaceId={selectedPlaceId}
          setSelectedPlaceId={setSelectedPlaceId}
          setPlaces={setPlaces}
        />
      </MainLayout>
      <FooterDecoration src={PawSVG} alt="Paw print" />
      <TeamUpFab onClick={() => setTeamUpOpen(true)} title="Team Up"><FaUsers /></TeamUpFab>
      {teamUpOpen && (
        <ModalBg onClick={() => setTeamUpOpen(false)}>
          <ModalBox onClick={e => e.stopPropagation()}>
            <h2 style={{fontFamily: 'Oswald, Arial, sans-serif', color: '#2563ff', margin: '0 0 16px 0'}}>Team Up</h2>
            <TeamUpList />
            <AddFab onClick={() => alert('Show create team form (demo)')} title="Create new team"><FaPlus /></AddFab>
          </ModalBox>
        </ModalBg>
      )}
    </AppContainer>
  );
};

export default App;
