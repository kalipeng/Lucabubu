import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';
import PawMarker from '../assets/paw-marker.svg';

const MapOuter = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: transparent;
`;

const MapContainer = styled.div`
  width: 96%;
  height: 92vh;
  background: #fffbe6;
  border-radius: 24px;
  box-shadow: 0 4px 32px #4a2c0a22;
  border: 3px solid #e0b000;
  overflow: hidden;
  display: flex;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  padding: 20px;
  text-align: center;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  padding: 20px;
  text-align: center;
`;

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#000000" }]
  }
];

interface Place {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
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

interface MapProps {
  selectedPlaceIds: string[];
  setSelectedPlaceIds: (ids: string[]) => void;
  setPlaces: (places: Place[]) => void;
  showUserLocation: boolean;
  highlightPlaceIds?: string[];
}

const Map: React.FC<MapProps & { onUserLocation?: (loc: google.maps.LatLngLiteral | null) => void; centerPlaceId?: string; places?: Place[] }> = ({ selectedPlaceIds, setSelectedPlaceIds, setPlaces, showUserLocation, onUserLocation, centerPlaceId, places: placesProp, highlightPlaceIds }) => {
  const [places, _setPlaces] = useState<Place[]>(placesProp || []);
  const [error] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [infoWindowPlace, setInfoWindowPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const prevPlacesLen = useRef(0);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  // 拉取数据并同步到父组件
  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
    const service = new google.maps.places.PlacesService(map);
    const allPlaces: Place[] = [];
    let finished = 0;
    const searchNearby = (searchType: 'park' | 'trail') => {
      const request = {
        location: { lat: 47.6101, lng: -122.2015 },
        radius: 50000,
        keyword: searchType === 'park' ? 'dog park' : 'hiking trail',
        type: searchType === 'park' ? 'park' : 'natural_feature',
      };
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const newPlaces: Place[] = results
            .filter(place => {
              const name = place.name?.toLowerCase() || '';
              if (searchType === 'trail') {
                return name.includes('trail') || name.includes('hiking') || name.includes('walk') || name.includes('path');
              } else {
                return name.includes('park') || name.includes('dog') || name.includes('off-leash');
              }
            })
            .map(place => ({
              id: place.place_id!,
              name: place.name!,
              position: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng()
              },
              type: searchType,
              dogFriendly: place.types?.includes('dog_park') || place.name?.toLowerCase().includes('dog') || place.name?.toLowerCase().includes('off-leash') || false,
              rating: place.rating || 0,
              reviews: place.user_ratings_total || 0,
              photoUrl: place.photos?.[0]
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${(place.photos[0] as any).photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                : undefined,
            }));
          allPlaces.push(...newPlaces);
        }
        finished++;
        if (finished === 2) {
          _setPlaces(allPlaces);
          setPlaces(allPlaces);
        }
      });
    };
    searchNearby('park');
    searchNearby('trail');
  }, [setPlaces]);

  useEffect(() => {
    if (mapRef) {
      onMapLoad(mapRef);
    }
    // eslint-disable-next-line
  }, [mapRef]);

  // 自动跳转动画：监听 centerPlaceId 变化，直接平移过去
  useEffect(() => {
    if (!mapRef || !centerPlaceId) return;
    const place = (placesProp || places).find(p => p.id === centerPlaceId);
    if (!place) return;
    mapRef.panTo(place.position);
  }, [centerPlaceId, mapRef, placesProp, places]);

  // 获取用户位置
  useEffect(() => {
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          if (onUserLocation) onUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        err => {
          setUserLocation(null);
          if (onUserLocation) onUserLocation(null);
        }
      );
    } else {
      setUserLocation(null);
      if (onUserLocation) onUserLocation(null);
    }
  }, [showUserLocation, onUserLocation]);

  // 新增地点时自动平移到新地点
  useEffect(() => {
    if (!mapRef) return;
    if (places.length > prevPlacesLen.current) {
      const newPlace = places[places.length - 1];
      if (newPlace) mapRef.panTo(newPlace.position);
    }
    prevPlacesLen.current = places.length;
  }, [places, mapRef]);

  if (loadError) {
    return (
      <MapOuter>
        <MapContainer>
          <ErrorMessage>
            Error loading Google Maps. Please check your API key and make sure the necessary APIs are enabled.
            <br />
            Error details: {loadError.message}
          </ErrorMessage>
        </MapContainer>
      </MapOuter>
    );
  }

  if (!isLoaded) {
    return (
      <MapOuter>
        <MapContainer>
          <LoadingMessage>Loading Google Maps...</LoadingMessage>
        </MapContainer>
      </MapOuter>
    );
  }

  if (error) {
    return (
      <MapOuter>
        <MapContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </MapContainer>
      </MapOuter>
    );
  }

  // 显示所有选中卡片的marker
  const selectedPlaces = selectedPlaceIds.map(id => places.find(p => p.id === id)).filter(Boolean) as Place[];
  const highlightPlaces = highlightPlaceIds ? highlightPlaceIds.map(id => places.find(p => p.id === id)).filter(Boolean) as Place[] : [];

  return (
    <MapOuter>
      <MapContainer>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={10}
          center={{ lat: 47.6101, lng: -122.2015 }}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
          }}
          onLoad={setMapRef}
        >
          {/* 高亮所有有team的公园（非选中时） */}
          {highlightPlaces.map(hp => (
            <Marker
              key={hp.id + '-highlight'}
              position={hp.position}
              icon={{
                url: PawMarker,
                scaledSize: new window.google.maps.Size(32, 32),
                anchor: new window.google.maps.Point(16, 16),
                labelOrigin: new window.google.maps.Point(16, 40)
              }}
              opacity={0.7}
            />
          ))}
          {/* 选中的公园高亮为大号marker */}
          {selectedPlaces.map(selectedPlace => (
            <Marker
              key={selectedPlace.id}
              position={selectedPlace.position}
              onClick={() => {
                setInfoWindowPlace(selectedPlace);
              }}
              icon={{
                url: PawMarker,
                scaledSize: new window.google.maps.Size(44, 44),
                anchor: new window.google.maps.Point(22, 22),
                labelOrigin: new window.google.maps.Point(22, 48)
              }}
              opacity={1}
            />
          ))}

          {/* 用户位置蓝点 */}
          {showUserLocation && userLocation && (
            <Marker
              position={userLocation}
              icon={window.google && window.google.maps ? {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#2563ff',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
                scale: 8,
              } : undefined}
              zIndex={999}
            />
          )}

          {infoWindowPlace && selectedPlaces.length > 0 && (
            <InfoWindow
              position={infoWindowPlace.position}
              onCloseClick={() => setInfoWindowPlace(null)}
            >
              <div>
                <img src={infoWindowPlace.photoUrl} alt={infoWindowPlace.name} style={{width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8}} />
                <h3>{infoWindowPlace.name}</h3>
                <p>Type: {infoWindowPlace.type}</p>
                <p>Dog Friendly: {infoWindowPlace.dogFriendly ? 'Yes' : 'No'}</p>
                <p>Rating: {infoWindowPlace.rating} ⭐ ({infoWindowPlace.reviews} reviews)</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </MapContainer>
    </MapOuter>
  );
};

export default Map; 