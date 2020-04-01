import { useEffect, useState } from "react";

const eventMapping = {
  onClick: "click",
  onDoubleClick: "dblclick"
};

export default function useGoogleMapMarker({
  id,
  position,
  type,
  maps,
  map,
  events,
  title,
  icon
}) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    const marker = new maps.Marker({
      position,
      map,
      title,
      type,
      icon
    });

    Object.keys(events).forEach(eventName =>
      marker.addListener(eventMapping[eventName], events[eventName])
    );

    if (id === 1) {
      var circle = new maps.Circle({
        radius: 30000,
        fillColor: '#AA0000'
      });
      circle.setMap(map);
      circle.bindTo('center', marker, 'position');
    }
    
    setMarker(marker);
  }, []);

  return marker;
}
