import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';

const MapContainer = styled.div`
  flex: 1;
  height: 100vh;
  min-width: 0;
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
  selectedPlaceId: string | null;
  setSelectedPlaceId: (id: string | null) => void;
  setPlaces: (places: Place[]) => void;
}

const Map: React.FC<MapProps> = ({ selectedPlaceId, setSelectedPlaceId, setPlaces }) => {
  const [places, _setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [infoWindowPlace, setInfoWindowPlace] = useState<Place | null>(null);

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

  if (loadError) {
    return (
      <MapContainer>
        <ErrorMessage>
          Error loading Google Maps. Please check your API key and make sure the necessary APIs are enabled.
          <br />
          Error details: {loadError.message}
        </ErrorMessage>
      </MapContainer>
    );
  }

  if (!isLoaded) {
    return (
      <MapContainer>
        <LoadingMessage>Loading Google Maps...</LoadingMessage>
      </MapContainer>
    );
  }

  if (error) {
    return (
      <MapContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </MapContainer>
    );
  }

  // 只显示选中卡片的marker
  const selectedPlace = selectedPlaceId ? places.find(p => p.id === selectedPlaceId) : null;

  return (
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
        {selectedPlace && (
          <Marker
            key={selectedPlace.id}
            position={selectedPlace.position}
            onClick={() => {
              setSelectedPlaceId(selectedPlace.id);
              setInfoWindowPlace(selectedPlace);
            }}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        )}

        {infoWindowPlace && selectedPlace && (
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
  );
};

export default Map; 