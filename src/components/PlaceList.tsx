import React, { useState } from 'react';
import styled from 'styled-components';
import Banner2 from '../assets/2.png';
import { FaDog, FaMapMarkerAlt, FaParking, FaStar, FaChevronDown, FaChevronUp, FaCoffee, FaUmbrella, FaUsers } from 'react-icons/fa';

interface Place {
  id: string;
  name: string;
  type: 'park' | 'trail';
  dogFriendly: boolean;
  rating: number;
  reviews: number;
  photoUrl?: string;
  address?: string;
  length?: string;
  duration?: string;
  difficulty?: string;
  terrain?: string;
  parking?: string;
  facilities?: string;
  crowd?: string;
  cafe?: string;
  weatherTip?: string;
  dogReview?: string;
}

interface PlaceListProps {
  places: Place[];
  selectedPlaceId: string | null;
  onSelect: (id: string) => void;
}

const ListContainer = styled.div`
  width: 340px;
  min-width: 260px;
  max-width: 400px;
  height: 100%;
  overflow-y: auto;
  background: #f8f8f8;
  border-right: 1px solid #eee;
  padding: 16px 8px;
  @media (max-width: 900px) {
    width: 100%;
    max-width: 100vw;
    border-right: none;
    border-bottom: 1px solid #eee;
    height: auto;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible;
  }
  font-family: 'Quicksand', Arial, sans-serif;
`;

const Card = styled.div<{ selected: boolean }>`
  background: #fff;
  border-radius: 16px;
  box-shadow: ${({ selected }) =>
    selected
      ? '0 4px 24px #2563ff33'
      : '0 2px 8px rgba(37,99,255,0.08)'};
  border-left: 4px solid #2563ff;
  margin: 16px 8px;
  padding: 16px 16px 0 16px;
  transition: box-shadow 0.2s, border 0.2s, transform 0.2s;
  cursor: pointer;
  position: relative;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 32px #2563ff22;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  color: #2563ff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  font-family: 'Oswald', Arial, sans-serif;
`;

const CardMeta = styled.div`
  color: #2563ff;
  font-size: 14px;
  margin-top: 4px;
`;

const ExpandIcon = styled.div`
  font-size: 20px;
  color: #2563ff;
  margin-left: 8px;
`;

const CardDetails = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1);
  border-top: 1px solid #e3e8f0;
  margin-top: 12px;
  padding-top: ${({ expanded }) => (expanded ? '16px' : '0')};
`;

const CardImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const CardDecoration = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 36px;
  opacity: 0.7;
`;

const PlaceCard: React.FC<{
  place: Place;
  selected: boolean;
  onClick: () => void;
}> = ({ place, selected, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card selected={selected} onClick={() => { onClick(); setExpanded(e => !e); }}>
      <CardHeader>
        <div>
          <CardTitle>{place.name}</CardTitle>
          <CardMeta>
            {place.dogFriendly ? '✅ Dog allowed' : '❌ No dogs'} · {place.length || '--'} · {place.difficulty || '--'}
          </CardMeta>
        </div>
        <ExpandIcon>
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </ExpandIcon>
      </CardHeader>
      <CardImage src={place.photoUrl || Banner2} alt={place.name} />
      <CardDetails expanded={expanded}>
        <div style={{ borderLeft: '2px solid #2563ff', paddingLeft: 12, marginBottom: 8 }}>
          <div><FaMapMarkerAlt /> Address: {place.address || '--'}</div>
          <div><FaParking /> Parking: {place.parking || '--'}</div>
          <div>Terrain: {place.terrain || '--'}</div>
          <div>Facilities: {place.facilities || '--'}</div>
          <div>Crowd: {place.crowd || '--'}</div>
          <div><FaCoffee /> Cafe: {place.cafe || '--'}</div>
          <div><FaUmbrella /> Weather tip: {place.weatherTip || '--'}</div>
        </div>
        <div style={{ color: '#2563ff', fontWeight: 600, margin: '8px 0 4px', fontFamily: 'Oswald, Arial, sans-serif' }}>Dog Review</div>
        <div style={{ fontStyle: 'italic', color: '#333' }}>{place.dogReview || 'No review yet.'}</div>
        {/* Team up info, QR code, map thumbnail, etc. can be added here */}
        <div style={{ marginTop: 12, color: '#2563ff', fontWeight: 600, fontFamily: 'Oswald, Arial, sans-serif' }}><FaUsers /> Team Up Info</div>
        <div style={{ fontSize: 13, color: '#333' }}>📌 Looking for dog-walking buddies!<br/>🕒 Time: Every Saturday 10am<br/>📍 Meeting: Trailhead parking lot<br/>🐶 Dog type: Social, playful<br/>💬 Contact: WeChat<br/>👟 Pace: Leisurely walk<br/>🧺 Snacks/Picnic: Yes<br/>🎾 Games: Frisbee<br/>📸 Photos: Yes<br/>🐾 Other pets: None</div>
      </CardDetails>
      <CardDecoration src={Banner2} alt="decoration" />
    </Card>
  );
};

const PlaceList: React.FC<PlaceListProps> = ({ places, selectedPlaceId, onSelect }) => {
  return (
    <ListContainer>
      {places.map(place => (
        <PlaceCard
          key={place.id}
          place={place}
          selected={selectedPlaceId === place.id}
          onClick={() => onSelect(place.id)}
        />
      ))}
    </ListContainer>
  );
};

export default PlaceList; 