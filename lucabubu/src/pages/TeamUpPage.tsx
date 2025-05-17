import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Map from '../components/Map';
import { FaPaw, FaCommentDots, FaPlus } from 'react-icons/fa';
import Logo from '../assets/Logo/SVG/Logo.svg';
import PawMarker from '../assets/paw-marker.svg';
import TeamUpModal from '../components/TeamUpModal';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #4a2c0a;
`;

const LeftPanel = styled.div`
  width: 400px;
  min-width: 300px;
  background: #fffbe6;
  border-right: 2px solid #e0b000;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TeamList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 32px 18px 80px 18px;
`;

const TeamCard = styled.div<{ selected: boolean }>`
  background: #fffde9;
  border-radius: 20px;
  box-shadow: 0 2px 12px #e0b00022;
  padding: 22px 20px 18px 20px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ selected }) => (selected ? '#e0b000' : 'transparent')};
  cursor: pointer;
`;

const TeamTitle = styled.div`
  color: #7a4a0a;
  font-size: 24px;
  font-weight: 700;
  font-family: 'Quicksand', Arial, sans-serif;
`;

const TeamPark = styled.div`
  color: #b97a2a;
  font-size: 16px;
  font-weight: 500;
  margin-top: 2px;
`;

const MemberAvatars = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
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

const IkonBar = styled.div`
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

const RightPanel = styled.div`
  flex: 1;
  background: #4a2c0a;
`;

const Header = styled.div`
  width: 100vw;
  background: #fffbe6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 0 10px 0;
  box-shadow: 0 2px 8px #e0b00022;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const LogoImg = styled.img`
  height: 54px;
  cursor: pointer;
`;

const TEAMUP_STORAGE_KEY = 'lucabubu_teams';

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
  border-radius: 32px;
  box-shadow: 0 8px 48px #e0b00033;
  padding: 32px 24px;
  min-width: 340px;
  max-width: 95vw;
  min-height: 320px;
  position: relative;
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

const TeamUpPage: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamIdx, setSelectedTeamIdx] = useState<number>(0);
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [highlightPlaceIds, setHighlightPlaceIds] = useState<string[]>([]);
  const [showUserLocation] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [dogTypeFilter, setDogTypeFilter] = useState<'all'|'small'|'large'>('all');
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🐾');
  const [newAvatars, setNewAvatars] = useState('');
  const [newNext, setNewNext] = useState('');
  const [newParkId, setNewParkId] = useState('');
  const [newDogType, setNewDogType] = useState('small');
  const [newMessage, setNewMessage] = useState('');
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [msgList, setMsgList] = useState<{user:string; text:string; time:number}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(TEAMUP_STORAGE_KEY);
    if (saved) setTeams(JSON.parse(saved));
  }, []);

  useEffect(() => {
    // 联动地图高亮
    if (teams[selectedTeamIdx]?.parkId) {
      setSelectedPlaceIds([teams[selectedTeamIdx].parkId]);
    }
  }, [selectedTeamIdx, teams]);

  useEffect(() => {
    // 计算所有有team的公园id
    const ids = Array.from(new Set(teams.map(t => t.parkId).filter(Boolean)));
    setHighlightPlaceIds(ids);
  }, [teams]);

  // 获取所有可选公园
  const allParks = Array.from(new Set(teams.map(t => t.parkId).filter(Boolean).concat(places.map((p:any)=>p.id))));
  const parkOptions = allParks.map(pid => {
    const t = teams.find(t => t.parkId === pid);
    const p = places.find((p:any) => p.id === pid);
    return { id: pid, name: t?.parkName || p?.name || pid };
  });

  // 留言本地存储key
  const getMsgKey = (teamIdx:number) => `lucabubu_teammsg_${teams[teamIdx]?.name || ''}_${teams[teamIdx]?.parkId || ''}`;
  // 加载留言
  useEffect(() => {
    if (teams[selectedTeamIdx]) {
      const key = getMsgKey(selectedTeamIdx);
      const saved = localStorage.getItem(key);
      setMsgList(saved ? JSON.parse(saved) : []);
    }
  }, [selectedTeamIdx, teams]);
  // 发送留言
  const handleSendMsg = () => {
    const user = getLoggedInUser();
    if (!user || !user.username) {
      alert('Please log in to leave a message!');
      return;
    }
    if (!msgInput.trim()) return;
    const newMsg = { user: user.username, text: msgInput, time: Date.now() };
    const newList = [...msgList, newMsg];
    setMsgList(newList);
    localStorage.setItem(getMsgKey(selectedTeamIdx), JSON.stringify(newList));
    setMsgInput('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newParkId) return;
    const newTeam = {
      icon: newIcon,
      name: newName,
      members: newAvatars.split(',').filter(Boolean).length || 1,
      avatars: newAvatars.split(',').map(a => a.trim()).filter(Boolean),
      next: newNext,
      parkId: newParkId,
      parkName: parkOptions.find(p => p.id === newParkId)?.name || '',
      dogType: newDogType,
      message: newMessage,
    };
    const updated = [...teams, newTeam];
    setTeams(updated);
    localStorage.setItem('lucabubu_teams', JSON.stringify(updated));
    setShowCreate(false);
    setNewName(''); setNewIcon('🐾'); setNewAvatars(''); setNewNext(''); setNewParkId(''); setNewDogType('small'); setNewMessage('');
  };

  return (
    <>
      <Header>
        <LogoImg src={Logo} alt="lucabubu logo" onClick={()=>window.location.href='/'} />
      </Header>
      <PageContainer style={{marginTop:72}}>
        <LeftPanel>
          <TeamList>
            {teams.filter(team => dogTypeFilter==='all' || team.dogType===dogTypeFilter).map((team, idx) => (
              <TeamCard key={team.name + idx} selected={idx === selectedTeamIdx} onClick={() => setSelectedTeamIdx(idx)}>
                <TeamTitle>{team.icon} {team.name}</TeamTitle>
                {team.parkName && <TeamPark>Park: {team.parkName}</TeamPark>}
                <MemberAvatars>
                  {team.avatars.map((a: any, i: number) => (
                    <Avatar key={i}>{a}</Avatar>
                  ))}
                  <MemberCount>{team.members} members</MemberCount>
                </MemberAvatars>
                <NextEvent>Next event: <b>{team.next}</b></NextEvent>
                <button
                  style={{marginTop:10, background:'#e0b000', color:'#fff', border:'none', borderRadius:8, padding:'6px 18px', fontWeight:600, cursor:'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    const user = getLoggedInUser();
                    if (!user || !user.username) {
                      alert('Please log in to join a team!');
                      return;
                    }
                    const avatar = user.username[0].toUpperCase();
                    if (team.avatars.includes(avatar)) {
                      alert('You have already joined this team!');
                      return;
                    }
                    const updatedTeams = teams.map((t, tIdx) => tIdx === idx ? {
                      ...t,
                      avatars: [...t.avatars, avatar],
                      members: t.members + 1
                    } : t);
                    setTeams(updatedTeams);
                    localStorage.setItem('lucabubu_teams', JSON.stringify(updatedTeams));
                  }}
                >Join</button>
              </TeamCard>
            ))}
          </TeamList>
          <IkonBar>
            <NavIcon
              style={dogTypeFilter==='all'?{background:'#ffe6a0'}:{}}
              onClick={()=>setDogTypeFilter('all')}
              title="Show All Teams"
            ><FaPaw /></NavIcon>
            <NavIcon
              style={dogTypeFilter==='small'?{background:'#ffe6a0'}:{}}
              onClick={()=>setDogTypeFilter('small')}
              title="Small Dog Teams"
            >🐶</NavIcon>
            <NavIcon
              style={dogTypeFilter==='large'?{background:'#ffe6a0'}:{}}
              onClick={()=>setDogTypeFilter('large')}
              title="Large Dog Teams"
            >🦮</NavIcon>
            <NavIcon onClick={()=>setShowMsgModal(true)} title="Team Message"><FaCommentDots /></NavIcon>
            <NavIcon onClick={()=>setShowCreate(true)} title="Create Team"><FaPlus /></NavIcon>
          </IkonBar>
          {showCreate && (
            <ModalBg onClick={()=>setShowCreate(false)}>
              <ModalBox onClick={e=>e.stopPropagation()}>
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
                      {parkOptions.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{marginBottom:16}}>
                    <label style={{fontWeight:600, color:'#7a4a0a'}}>Dog Type: </label>
                    <select value={newDogType} onChange={e=>setNewDogType(e.target.value)} style={{fontSize:18, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'2px 8px', minWidth:120}} required>
                      <option value="small">Small Dog</option>
                      <option value="large">Large Dog</option>
                    </select>
                  </div>
                  <div style={{marginBottom:16}}>
                    <label style={{fontWeight:600, color:'#7a4a0a'}}>Message: </label>
                    <textarea value={newMessage} onChange={e=>setNewMessage(e.target.value)} style={{fontSize:16, borderRadius:8, border:'1.5px solid #e0b000', marginLeft:8, padding:'4px 8px', minWidth:220, minHeight:48}} />
                  </div>
                  <button type="submit" style={{marginTop:8, background:'#e0b000', color:'#fff', border:'none', borderRadius:8, padding:'8px 24px', fontWeight:600, cursor:'pointer'}}>Create</button>
                  <button type="button" style={{marginLeft:16, background:'#fffbe6', color:'#b97a2a', border:'1.5px solid #b97a2a', borderRadius:8, padding:'8px 18px', fontWeight:600, cursor:'pointer'}} onClick={()=>setShowCreate(false)}>Cancel</button>
                </form>
              </ModalBox>
            </ModalBg>
          )}
          {showMsgModal && (
            <ModalBg onClick={()=>setShowMsgModal(false)}>
              <ModalBox style={{minWidth:340, minHeight:320, padding:'32px 24px'}} onClick={e=>e.stopPropagation()}>
                <h2 style={{color:'#7a4a0a', fontFamily:'Quicksand', margin:'0 0 18px 0'}}>Team Message</h2>
                <div style={{maxHeight:220, overflowY:'auto', marginBottom:12, background:'#fffde9', borderRadius:12, padding:12, border:'1.5px solid #e0b000'}}>
                  {msgList.length === 0 && <div style={{color:'#b97a2a'}}>No messages yet.</div>}
                  {msgList.map((msg, i) => (
                    <div key={i} style={{marginBottom:8}}>
                      <b style={{color:'#b97a2a'}}>{msg.user}:</b> <span style={{color:'#4a2c0a'}}>{msg.text}</span>
                      <span style={{color:'#aaa', fontSize:12, marginLeft:8}}>{new Date(msg.time).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <input
                    value={msgInput}
                    onChange={e=>setMsgInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{flex:1, fontSize:16, borderRadius:8, border:'1.5px solid #e0b000', padding:'6px 10px'}}
                    onKeyDown={e=>{if(e.key==='Enter'){handleSendMsg();}}}
                  />
                  <button
                    style={{marginLeft:10, background:'#e0b000', color:'#fff', border:'none', borderRadius:8, padding:'8px 18px', fontWeight:600, cursor:'pointer'}}
                    onClick={handleSendMsg}
                  >Send</button>
                </div>
              </ModalBox>
            </ModalBg>
          )}
        </LeftPanel>
        <RightPanel>
          <Map
            selectedPlaceIds={selectedPlaceIds}
            setSelectedPlaceIds={setSelectedPlaceIds}
            setPlaces={setPlaces}
            showUserLocation={showUserLocation}
            highlightPlaceIds={selectedTeamIdx >= 0 ? [teams[selectedTeamIdx]?.parkId] : highlightPlaceIds}
          />
        </RightPanel>
      </PageContainer>
    </>
  );
};

export default TeamUpPage; 