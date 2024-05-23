import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const defaultCenter = {
  lat: 29.9511,
  lng: -90.0715,
};

function Map() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : <></>;
}

export default React.memo(Map);