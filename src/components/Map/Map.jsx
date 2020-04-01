import React, { useEffect } from "react";
import useGoogleMap from "./useGoogleMap.js";

export default function Map({ center, zoom, children, events }) {
  const { maps, map, mapRef, loading } = useGoogleMap({ zoom, center, events });

  useEffect(
    () => {
      map && map.panTo(center);
    },
    []
  );

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-ref" />
      {!loading &&
        React.Children.map(children, child => {
          return React.cloneElement(child, { map, maps });
        })}
    </div>
  );
}
