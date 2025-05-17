import React, { useState } from 'react';
import styled from 'styled-components';
import PinCross from '../assets/pin-cross.svg';
import PinPaw from '../assets/pin-paw.svg';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  position: google.maps.LatLngLiteral;
}

interface PlaceListProps {
  places: Place[];
  selectedPlaceIds: string[];
  onSelect: (id: string) => void;
  showUserLocation: boolean;
  setShowUserLocation: (show: boolean) => void;
  onShowDetail: (place: Place) => void;
  userLocation?: google.maps.LatLngLiteral | null;
}

const ListContainer = styled.div`
  width: 340px;
  min-width: 260px;
  max-width: 400px;
  height: 100%;
  overflow-y: auto;
  background: #f5e2c0;
  border-right: 1px solid #e0b000;
  padding: 16px 8px;
  @media (max-width: 900px) {
    width: 100%;
    max-width: 100vw;
    border-right: none;
    border-bottom: 1px solid #e0b000;
    height: auto;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: visible;
  }
  font-family: 'Quicksand', Arial, sans-serif;
`;

const Card = styled.div<{ selected: boolean }>`
  background: #fffbe6;
  border-radius: 18px;
  border: 2px solid #e0b000;
  margin: 18px 8px;
  padding: 18px 20px 14px 80px;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  box-shadow: 0 2px 8px #e0b00022;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.18s, border 0.18s;
  align-items: flex-start;
  text-align: left;
  &:hover {
    box-shadow: 0 6px 24px #e0b00033;
    border-color: #e0b000;
  }
`;

const CardRow = styled.div`
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  color: #4a2c0a;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px 0;
  font-family: 'Quicksand', Arial, sans-serif;
  text-align: left;
`;

const DetailLink = styled.span`
  color: #7a4a0a;
  font-size: 16px;
  font-family: 'Quicksand', Arial, sans-serif;
  text-decoration: underline;
  margin-top: auto;
  margin-bottom: 6px;
  align-self: flex-start;
  cursor: pointer;
  position: absolute;
  left: 80px;
  bottom: 12px;
  &:hover { color: #e0b000; }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 8px;
`;

const ToggleLabel = styled.label`
  font-size: 15px;
  color: #2563ff;
  font-weight: 600;
  margin-left: 8px;
  cursor: pointer;
`;

const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  width: 36px;
  height: 20px;
  accent-color: #2563ff;
  cursor: pointer;
`;

const PinWrapper = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PlaceCard: React.FC<{
  place: Place;
  selected: boolean;
  onClick: () => void;
  onShowDetail: (place: Place) => void;
  showUserLocation: boolean;
  userLocation?: google.maps.LatLngLiteral | null;
}> = ({ place, selected, onClick, onShowDetail, showUserLocation, userLocation }) => {
  let distanceStr = '';
  if (showUserLocation && userLocation) {
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371e3;
    const dLat = toRad(place.position.lat - userLocation.lat);
    const dLng = toRad(place.position.lng - userLocation.lng);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(userLocation.lat)) * Math.cos(toRad(place.position.lat)) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const dist = R * c;
    distanceStr = dist > 1000 ? (dist/1000).toFixed(2) + ' km' : Math.round(dist) + ' m';
  }
  return (
    <Card selected={selected} onClick={onClick}>
      <PinWrapper>
        <img src={selected ? PinPaw : PinCross} alt="pin" style={{ width: 48, height: 56 }} />
      </PinWrapper>
      <CardRow style={{ marginBottom: 'auto', marginTop: 0 }}>
        <div>
          <CardTitle>{place.name}</CardTitle>
          {showUserLocation && userLocation && (
            <div style={{ color: '#b97a2a', fontSize: 15, fontWeight: 600, marginTop: 2 }}>
              Distance: {distanceStr}
            </div>
          )}
        </div>
      </CardRow>
      <DetailLink onClick={e => { e.stopPropagation(); onShowDetail(place); }}>detail</DetailLink>
    </Card>
  );
};

const PlaceList: React.FC<PlaceListProps> = ({ places, selectedPlaceIds, onSelect, showUserLocation, setShowUserLocation, onShowDetail, userLocation }) => {
  return (
    <ListContainer>
      <ToggleContainer>
        <ToggleSwitch
          checked={showUserLocation}
          onChange={e => setShowUserLocation(e.target.checked)}
          id="toggle-user-location"
        />
        <ToggleLabel htmlFor="toggle-user-location">Show My Location</ToggleLabel>
      </ToggleContainer>
      {places.map(place => (
        <PlaceCard
          key={place.id}
          place={place}
          selected={selectedPlaceIds.includes(place.id)}
          onClick={() => onSelect(place.id)}
          onShowDetail={onShowDetail}
          showUserLocation={showUserLocation}
          userLocation={userLocation}
        />
      ))}
    </ListContainer>
  );
};

export default PlaceList; 