import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPaw, FaPlus, FaCommentDots } from 'react-icons/fa';

const ModalBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.10);
  z-index: 2100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fffbe6;
  border-radius: 38px;
  box-shadow: 0 8px 48px #e0b00033;
  padding: 32px 0 0 0;
  min-width: 370px;
  max-width: 95vw;
  min-height: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PawTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 38px;
  font-family: 'Quicksand', Arial, sans-serif;
  font-weight: 700;
  color: #7a4a0a;
  margin-bottom: 18px;
  margin-top: 8px;
  & svg {
    margin-right: 12px;
    font-size: 44px;
    color: #7a4a0a;
  }
`;

const GroupList = styled.div`
  width: 100%;
  padding: 0 18px;
  flex: 1;
  overflow-y: auto;
`;

const GroupCard = styled.div`
  background: #fffde9;
  border-radius: 24px;
  box-shadow: 0 2px 12px #e0b00022;
  padding: 22px 20px 18px 20px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
`;

const GroupRow = styled.div`
  display: flex;
  align-items: center;
`;

const GroupIcon = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #ffe6a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-right: 18px;
`;

const GroupTitle = styled.div`
  color: #7a4a0a;
  font-size: 26px;
  font-weight: 700;
  font-family: 'Quicksand', Arial, sans-serif;
  margin-bottom: 2px;
`;

const GroupSub = styled.div`
  color: #7a4a0a;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Quicksand', Arial, sans-serif;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
`;

const MemberAvatars = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffe6a0;
  border: 2px solid #e0b000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #7a4a0a;
  margin-right: -8px;
  z-index: 1;
`;

const MemberCount = styled.span`
  color: #7a4a0a;
  font-size: 17px;
  margin-right: 18px;
`;

const NextEvent = styled.div`
  color: #7a4a0a;
  font-size: 17px;
  margin-top: 2px;
`;

const BottomNav = styled.div`
  width: 100%;
  background: #fffde9;
  border-radius: 0 0 32px 32px;
  box-shadow: 0 -2px 12px #e0b00022;
  padding: 18px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const NavIcon = styled.div`
  font-size: 32px;
  color: #b97a2a;
  cursor: pointer;
  padding: 0 8px;
  border-radius: 12px;
  transition: background 0.15s;
  &:hover { background: #ffe6a0; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  color: #b97a2a;
  cursor: pointer;
`;

function getLoggedInUser() {
  const u = localStorage.getItem('lucabubu_loggedin');
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
}

const defaultGroups = [
  {
    icon: '🐶',
    name: 'Downtown Dog Lovers',
    members: 6,
    avatars: ['🧑‍🦰', '👩', '👨🏾'],
    next: 'Dog Park Meetup',
  },
  {
    icon: '🎮',
    name: 'Game Night Crew',
    members: 9,
    avatars: ['👨🏻', '👩🏽‍🦱', '👩'],
    next: 'Tuesday 7:00 PM',
  },
  {
    icon: '🐾',
    name: 'Chat',
    members: 3,
    avatars: ['🐶', '🧑‍🦰', '👩'],
    next: "Can't wait for our next meetu..",
  },
];

interface TeamUpModalProps {
  onClose: () => void;
  places?: { id: string; name: string }[];
}

const TEAMUP_STORAGE_KEY = 'lucabubu_teams';

const TeamUpModal: React.FC<TeamUpModalProps> = ({ onClose, places }) => {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem(TEAMUP_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return defaultGroups;
  });
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🐾');
  const [newAvatars, setNewAvatars] = useState('');
  const [newNext, setNewNext] = useState('');
  const [newParkId, setNewParkId] = useState('');

  const user = getLoggedInUser();

  useEffect(() => {
    localStorage.setItem(TEAMUP_STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setGroups([
      ...groups,
      {
        icon: newIcon,
        name: newName,
        members: newAvatars.split(',').filter(Boolean).length || 1,
        avatars: newAvatars.split(',').map(a => a.trim()).filter(Boolean),
        next: newNext,
        parkId: newParkId,
        parkName: (places?.find(p => p.id === newParkId)?.name) || '',
      },
    ]);
    setShowCreate(false);
    setNewName('');
    setNewIcon('🐾');
    setNewAvatars('');
    setNewNext('');
    setNewParkId('');
  };

  return (
    <ModalBg onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <CloseBtn onClick={onClose} title="Close">×</CloseBtn>
        <PawTitle><FaPaw />Team Up</PawTitle>
        <GroupList>
          {groups.map((g: any, i: number) => (
            <GroupCard key={g.name + i}>
              <GroupRow>
                <GroupIcon>{g.icon}</GroupIcon>
                <div>
                  <GroupTitle>{g.name}</GroupTitle>
                  {g.parkName && (
                    <div style={{ color: '#b97a2a', fontSize: 16, fontWeight: 500, marginTop: 2 }}>
                      Park: {g.parkName}
                    </div>
                  )}
                </div>
              </GroupRow>
              <MemberRow>
                <MemberAvatars>
                  {g.avatars.map((a: any, idx: number) => (
                    <Avatar key={idx}>{a}</Avatar>
                  ))}
                </MemberAvatars>
                <MemberCount>{g.members} members</MemberCount>
              </MemberRow>
              <NextEvent>Next event: <b>{g.next}</b></NextEvent>
            </GroupCard>
          ))}
        </GroupList>
        <BottomNav>
          <NavIcon><FaPaw /></NavIcon>
          <NavIcon><FaCommentDots /></NavIcon>
          <NavIcon
            onClick={() => {
              if (!user) {
                alert('Please log in to create a team!');
                return;
              }
              setShowCreate(true);
            }}
            title="Create Team"
          >
            <FaPlus />
          </NavIcon>
        </BottomNav>
        {showCreate && (
          <ModalBg style={{zIndex:2200, background:'rgba(0,0,0,0.18)'}} onClick={()=>setShowCreate(false)}>
            <ModalBox style={{minWidth:320, minHeight:360, padding:'32px 24px'}} onClick={e=>e.stopPropagation()}>
              <h2 style={{color:'#7a4a0a', fontFamily:'Quicksand', margin:'0 0 18px 0'}}>Create New Team</h2>
              <form onSubmit={handleCreate}>
                <div style={{marginBottom:16}}>
                  <label style={{fontWeight:600, color:'#7a4a0a'}}>Icon (emoji): </label>
                  <input value={newIcon} onChange={e=>setNewIcon(e.target.value)} maxLength={2} style={{fontSize:24, width:40, textAlign:'center', borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontWeight:600, color:'#7a4a0a'}}>Team Name: </label>
                  <input value={newName} onChange={e=>setNewName(e.target.value)} required style={{fontSize:18, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'2px 8px'}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontWeight:600, color:'#7a4a0a'}}>Avatars (comma separated emoji): </label>
                  <input value={newAvatars} onChange={e=>setNewAvatars(e.target.value)} placeholder="🐶,🧑‍🦰,👩" style={{fontSize:18, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'2px 8px', width:120}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontWeight:600, color:'#7a4a0a'}}>Next Event: </label>
                  <input value={newNext} onChange={e=>setNewNext(e.target.value)} style={{fontSize:18, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'2px 8px'}} />
                </div>
                <div style={{marginBottom:16}}>
                  <label style={{fontWeight:600, color:'#7a4a0a'}}>Park: </label>
                  <select value={newParkId} onChange={e=>setNewParkId(e.target.value)} style={{fontSize:18, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'2px 8px', minWidth:120}} required>
                    <option value="">Select a park</option>
                    {places && places.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" style={{marginTop:8, background:'#e0b000', color:'#fff', border:'none', borderRadius:8, padding:'8px 24px', fontWeight:600, cursor:'pointer'}}>Create</button>
                <button type="button" style={{marginLeft:16, background:'#fffbe6', color:'#b97a2a', border:'1.5px solid #b97a2a', borderRadius:8, padding:'8px 18px', fontWeight:600, cursor:'pointer'}} onClick={()=>setShowCreate(false)}>Cancel</button>
              </form>
            </ModalBox>
          </ModalBg>
        )}
      </ModalBox>
    </ModalBg>
  );
};

export default TeamUpModal; 