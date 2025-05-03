import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
}

const Map: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onMapLoad = useCallback((map: google.maps.Map) => {
    try {
      setMapRef(map);
      const service = new google.maps.places.PlacesService(map);
      
      const searchNearby = (searchType: 'park' | 'trail') => {
        const request = {
          location: { lat: 47.6101, lng: -122.2015 }, // Bellevue coordinates
          radius: 50000, // 50km radius (approximately 30 miles)
          keyword: searchType === 'park' ? 'dog park' : 'hiking trail',
          type: searchType === 'park' ? 'park' : 'natural_feature'
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const newPlaces: Place[] = results
              .filter(place => {
                const name = place.name?.toLowerCase() || '';
                if (searchType === 'trail') {
                  return name.includes('trail') || 
                         name.includes('hiking') || 
                         name.includes('walk') ||
                         name.includes('path');
                } else {
                  return name.includes('park') || 
                         name.includes('dog') ||
                         name.includes('off-leash');
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
                dogFriendly: place.types?.includes('dog_park') || 
                           place.name?.toLowerCase().includes('dog') || 
                           place.name?.toLowerCase().includes('off-leash') || 
                           false,
                rating: place.rating || 0,
                reviews: place.user_ratings_total || 0
              }));
            
            if (newPlaces.length > 0) {
              setPlaces(prev => [...prev, ...newPlaces]);
              console.log(`Found ${newPlaces.length} ${searchType}s:`, newPlaces.map(p => p.name));
            } else {
              console.log(`No ${searchType}s found with the current search criteria`);
            }
          } else {
            console.log(`Search status for ${searchType}:`, status);
            if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              setError(`Error searching for ${searchType}: ${status}. Please check your API key settings.`);
            }
          }
        });
      };

      // 搜索不同类型的公园和步道
      searchNearby('park');
      searchNearby('trail');
    } catch (err) {
      setError(`Error initializing map: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Map initialization error:', err);
    }
  }, []);

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

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={10} // 缩小缩放级别以显示更大区域
        center={{ lat: 47.6101, lng: -122.2015 }}
        options={{
          styles: mapStyles,
          disableDefaultUI: false,
        }}
        onLoad={onMapLoad}
      >
        {places.map(place => (
          <Marker
            key={place.id}
            position={place.position}
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.position}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>Type: {selectedPlace.type}</p>
              <p>Dog Friendly: {selectedPlace.dogFriendly ? 'Yes' : 'No'}</p>
              <p>Rating: {selectedPlace.rating} ⭐ ({selectedPlace.reviews} reviews)</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map; 