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
    googleMapsApiKey: '',
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      getPosition();
    }
  }, [getPosition, isGeolocationAvailable, isGeolocationEnabled]);

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
      <p>
        {currentCenter.lat}, {currentCenter.lng}
      </p>
      {!isGeolocationEnabled && (
        <div>
          <p>
            Geolocation is not enabled. Please enable location services in your
            browser settings.
          </p>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentCenter}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {coords && <Marker position={currentCenter} />}
        <></>
      </GoogleMap>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(Map);
