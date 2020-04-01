import useGoogleMapMarker from "./useGoogleMapMarker";

export default function Marker({
  id,
  position,
  type,
  maps,
  map,
  events,
  title,
  icon
}) {
  useGoogleMapMarker({
    id,
    position,
    type,
    maps,
    map,
    events,
    title,
    icon
  });

  return null;
}
