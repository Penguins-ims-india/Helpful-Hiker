import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useGeolocated } from 'react-geolocated';
import { debounce } from 'lodash';
import { Typography, Container } from '@mui/material';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)', // Adjust height as per your requirement
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
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    watchPosition,
    trigger,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyB89yBjj_qquQ1qLK_ZRMhedTQa4RbXRpY', // Replace with your actual API key
  });
  
  const [picture, setPicture] = useState('https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png');
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
        },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  const handleZoomChanged = useCallback(
    debounce(() => {
      if (map) {
        console.log('Zoom Level:', map.getZoom());
      }
    }, 200),
    [map],
  );

  const getUserPicture = useCallback(() => {
    axios.get('/api/user').then(({ data }) => {
      setPicture(data.picture);
    }).catch((error) => {
      console.error('Error fetching user picture:', error);
    });
  }, []);

  useEffect(() => {
    getUserPicture();
  }, [getUserPicture]);

  const CustomMarker = ({ position }) => (
    <Marker
      position={position}
      icon={{
        url: picture,
        scaledSize: new window.google.maps.Size(48, 48), // Adjust the size as needed
        origin: new window.google.maps.Point(0, 0), // Adjust the origin point
        anchor: new window.google.maps.Point(24, 24), // Adjust the anchor point
      }}
    />
  );

  return isLoaded ? (
    <Container maxWidth='xl'>
      <Typography variant='h6' gutterBottom>
        This map is so that you can see your location while on a hike so you don't get lost.
      </Typography>
      {!isGeolocationEnabled && (
        <Typography variant='body1' gutterBottom>
          Geolocation is not enabled. Please enable location services in your browser settings.
        </Typography>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <CustomMarker position={currentPosition} />
      </GoogleMap>
    </Container>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(Map);
