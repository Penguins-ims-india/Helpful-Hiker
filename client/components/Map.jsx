import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useGeolocated } from 'react-geolocated';
import { debounce } from 'lodash';

const containerStyle = {
  width: '1000px',
  height: '1000px',
};

const defaultCenter = {
  lat: 29.9511,
  lng: -90.0715,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  minZoom: 3,
  maxZoom: 20,
};

function Map() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled, watchPosition, trigger } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      watchPosition: true,
      userDecisionTimeout: 5000,
    });

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

    }
  }, [getPosition, isGeolocationAvailable, isGeolocationEnabled]);

    return () => {
      if (map) {
        google.maps.event.clearListeners(map, 'zoom_changed');
      }
    };
  }, [map, handleZoomChanged]);

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
      <p>{currentPosition.lat}, {currentPosition.lng}</p>
      {!isGeolocationEnabled && (
        <div>
          <p>Geolocation is not enabled. Please enable location services in your browser settings.</p>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(Map);
