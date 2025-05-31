import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Map from './components/Map';
import Logo from './assets/Logo/SVG/Logo.svg';
import Banner1 from './assets/1.png';
import PawSVG from './assets/paw.png';
import PlaceList from './components/PlaceList';
import { FaUsers } from 'react-icons/fa';
import Login from './pages/Login';
import Register from './pages/Register';
import TeamUpModal from './components/TeamUpModal';
import TeamUpPage from './pages/TeamUpPage';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Quicksand', Arial, sans-serif;
    background: #4a2c0a;
    color: #fffbe6;
    margin: 0;
    padding: 0;
  }
  #root {
    background: #4a2c0a;
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  background: #4a2c0a;
  min-height: 100vh;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  background: #fffbe6;
  box-shadow: 0 2px 8px #e0b00022;
  position: relative;
`;

const NavRight = styled.div`
  position: absolute;
  right: 32px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0b000;
  color: #fffbe6;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  box-shadow: 0 2px 8px #e0b00033;
`;

const LogoImg = styled.img`
  height: 48px;
`;

const LoginNavBtn = styled.button`
  background: #e08a3a;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 16px;
  padding: 8px 28px;
  margin-left: 24px;
  box-shadow: 0 2px 8px #e0b00033;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #b97a2a;
  }
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
  background: #4a2c0a;
`;

const TeamUpFab = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #B97A2A;
  color: #fff;
  border: none;
  box-shadow: 0 4px 24px #B97A2A55;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2000;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px #B97A2A99;
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
  background: #fffbe6;
  border-radius: 24px;
  box-shadow: 0 8px 48px #B97A2A33;
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

const FloatingDetail = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  background: #fffbe6;
  color: #7a4a0a;
  border-radius: 16px 16px 0 16px;
  box-shadow: 0 2px 12px #e0b00033;
  padding: 10px 24px 10px 18px;
  font-size: 16px;
  font-family: 'Quicksand', Arial, sans-serif;
  border-bottom: 3px solid #e0b000;
  border-right: 3px solid #e0b000;
  cursor: pointer;
  z-index: 3000;
  text-decoration: underline;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 24px #e0b00055; }
`;

const DetailModalBg = styled.div`
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 3100;
  display: flex; align-items: center; justify-content: center;
`;

const DetailModalBox = styled.div`
  background: #fffbe6;
  border-radius: 24px;
  box-shadow: 0 8px 48px #B97A2A33;
  padding: 32px 24px;
  min-width: 340px;
  max-width: 90vw;
  min-height: 220px;
  position: relative;
  color: #7a4a0a;
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

function getLoggedInUser() {
  const u = localStorage.getItem('lucabubu_loggedin');
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
}

const App: React.FC = () => {
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [places, setPlaces] = useState<any[]>([]);
  const [teamUpOpen, setTeamUpOpen] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailPlace, setDetailPlace] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [centerPlaceId, setCenterPlaceId] = useState<string | undefined>(undefined);

  const handleSelectPlace = (id: string) => {
    setSelectedPlaceIds(prev => {
      setCenterPlaceId(id); // 每次点击都更新centerPlaceId
      if (prev[prev.length - 1] === id && prev.length === 1) {
        return [id];
      }
      return prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id];
    });
  };

  const handleShowDetail = (place: any) => {
    setDetailPlace(place);
    setShowDetailModal(true);
  };

  if (window.location.pathname === '/login') {
    return <Login />;
  }
  if (window.location.pathname === '/register') {
    return <Register />;
  }
  if (window.location.pathname === '/teamup') {
    return <TeamUpPage />;
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <NavBar>
        <LogoImg src={Logo} alt="lucabubu logo" style={{cursor:'pointer'}} onClick={()=>window.location.href='/'} />
        <NavRight>
          {(() => {
            const user = getLoggedInUser();
            if (user && user.username) {
              return (
                <UserBox>
                  <Avatar>{user.username[0].toUpperCase()}</Avatar>
                  <span style={{color:'#7a4a0a', fontWeight:700, fontSize:18, marginRight:16}}>{user.username}</span>
                  <LoginNavBtn style={{background:'#fffbe6', color:'#b97a2a', border:'1.5px solid #b97a2a', fontWeight:600, fontSize:16, padding:'6px 18px', marginLeft:0}} onClick={() => {localStorage.removeItem('lucabubu_loggedin'); window.location.reload();}}>Sign Out</LoginNavBtn>
                </UserBox>
              );
            } else {
              return <LoginNavBtn onClick={() => window.location.href = '/login'}>Log in</LoginNavBtn>;
            }
          })()}
        </NavRight>
      </NavBar>
      <CornerIllustration src={Banner1} alt="Dog cartoon" />
      <MainLayout>
        <PlaceList
          places={places}
          selectedPlaceIds={selectedPlaceIds}
          onSelect={handleSelectPlace}
          showUserLocation={showUserLocation}
          setShowUserLocation={setShowUserLocation}
          onShowDetail={handleShowDetail}
          userLocation={userLocation}
        />
        <Map
          selectedPlaceIds={selectedPlaceIds}
          setSelectedPlaceIds={setSelectedPlaceIds}
          setPlaces={setPlaces}
          showUserLocation={showUserLocation}
          onUserLocation={setUserLocation}
          centerPlaceId={centerPlaceId}
          places={places}
        />
      </MainLayout>
      <FooterDecoration src={PawSVG} alt="Paw print" />
      {showDetailModal && detailPlace && (
        <DetailModalBg onClick={() => setShowDetailModal(false)}>
          <DetailModalBox onClick={e => e.stopPropagation()}>
            <h2 style={{fontFamily: 'Oswald, Arial, sans-serif', color: '#7a4a0a', margin: '0 0 16px 0'}}>{detailPlace.name}</h2>
            <div style={{marginBottom: 8}}><b>Dog Friendly:</b> {detailPlace.dogFriendly ? 'Yes' : 'No'}</div>
            <div><b>Address:</b> {detailPlace.address || '--'}</div>
            <div><b>Length:</b> {detailPlace.length || '--'}</div>
            <div><b>Difficulty:</b> {detailPlace.difficulty || '--'}</div>
            <div><b>Parking:</b> {detailPlace.parking || '--'}</div>
            <div><b>Facilities:</b> {detailPlace.facilities || '--'}</div>
            <div><b>Dog Review:</b> <span style={{fontStyle: 'italic'}}>{detailPlace.dogReview || 'No review yet.'}</span></div>
            <button style={{marginTop: 18, background: '#e0b000', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 600, cursor: 'pointer'}} onClick={() => setShowDetailModal(false)}>Close</button>
          </DetailModalBox>
        </DetailModalBg>
      )}
      <TeamUpFab
        onClick={() => {
          const user = getLoggedInUser();
          if (user && user.username) window.location.href = '/teamup';
          else alert('Please log in to use Team Up!');
        }}
        title="Team Up"
      >
        <FaUsers color="#fffbe6" />
      </TeamUpFab>
      {teamUpOpen && <TeamUpModal onClose={() => setTeamUpOpen(false)} places={places.map(p => ({id: p.id, name: p.name}))} />}
    </AppContainer>
  );
};

export default App;
