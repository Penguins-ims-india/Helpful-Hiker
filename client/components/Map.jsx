import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useGeolocated } from 'react-geolocated';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const defaultCenter = {
  lat: 29.9511,
  lng: -90.0715,
};

function Map() {
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    getPosition,
    trigger,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAHStHEGequcbfK849wQ4v3IUgyFpNuEIM', // Replace with your API key
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const currentCenter = coords
    ? { lat: coords.latitude, lng: coords.longitude }
    : defaultCenter;

  if (loadError) {
    console.error('Error loading Google Maps API:', loadError);
  }

  if (!isGeolocationAvailable) {
    console.error('Geolocation is not available on this browser.');
  }

  if (!isGeolocationEnabled) {
    console.error('Geolocation is not enabled.');
  }

  return isLoaded ? (
    <>
      <p>{(currentCenter.lat, currentCenter.lng)}</p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(Map);
