import React, { useState, useEffect } from "react";
import {FiPlus} from 'react-icons/fi';

import Map from "../../components/Map/Map";
import Marker from "../../components/Map/Marker";

export default function Home() {
    const [markers, setMarkers] = useState([]);
    const [accessGranted, setAccess] = useState(true);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [url, setUrl] = useState('');
    const [factor, setFactor] = useState(-1);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude + 0.01);
                setLongitude(longitude + 0.01);
                setAccess(true);
                const current = [{
                    id: 1,
                    title: 'You are here',
                    lat: latitude,
                    lng: longitude,
                    type: 'current',
                    icon: 'https://maps.google.com/mapfiles/kml/pal3/icon23.png'
                }];

                setMarkers([...markers, ...current]);
            }, (err) => {
                setAccess(false);
            }, {
            timeout: 30000,
        }
        );
    }, []);

    function showPermissionMessage() {
        if (!accessGranted) {
            return (
                <div className="no-permission">
                    You didn't let me know you location
                </div>
            );
        }
    }

    function handleMarker(e) {
        e.preventDefault();

        const lastMarker = markers[markers.length - 1];
        const current = [{
            id: lastMarker.id + 1,
            title: '',
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            type: 'new',
            icon: url
        }];

        const appliedFactor = 0.01 * factor * markers.length;

        setMarkers([...markers, ...current]);
        setLatitude(latitude + appliedFactor);
        setLongitude(longitude + appliedFactor);
        setFactor(factor * -1);
    }

    if (markers.length > 0) {
        return (
            <div>
                <h1>Example Google Maps with Custom Marker</h1>
                
                <Map
                    zoom={10}
                    center={{ lat: -26.9206069, lng: -49.0766607 }}
                    events={{ onBoundsChangerd: () => { } }}
                >
                    {markers.filter(x => x.lat && x.lng).map((m, index) => (
                        <Marker
                            key={index}
                            title={m.title}
                            position={{ lat: m.lat, lng: m.lng }}
                            type={m.type}
                            icon={m.icon}
                            id={m.id}
                            events={{
                                onClick: () => window.alert(`${m.id}`)
                            }}
                        />
                    ))}
                </Map>

                <div className="new-marker">
                    <div>
                        <span>URL Icon Image</span>
                        <input
                            type="text"
                            placeholder="Marker URL"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Latitude</span>
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Longitude</span>
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </div>
                    <button onClick={handleMarker} className="button">
                        <FiPlus size={16} color="#e02041" />
                        New marker
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Example Google Maps with Custom Marker</h1>
                <p>I need to know your location</p>
                {showPermissionMessage()}
            </>
        );
    }
}
