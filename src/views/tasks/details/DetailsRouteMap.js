import { useMemo, useEffect } from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const DetailsRouteMap = ({ marker }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });

  const defaultMarker = { lat: 40.7831, lng: -73.9712 };
  const center = useMemo(() => (defaultMarker), []);

  useEffect(() => {
    console.log("Component re-render!");
  }, [isLoaded]);

  return (isLoaded)
    ? <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
      </GoogleMap>
    : <Skeleton height="100%" />
}
