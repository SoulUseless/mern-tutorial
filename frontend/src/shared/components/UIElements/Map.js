import React, { useRef, useEffect } from 'react';

import './Map.css';

function Map(props) {
    const mapRef = useRef();

    const { center, zoom } = props;
    
    /* useEffect delays the running of the inner function
        it runs on the first rendering, but will update again when center and zoom is updated
    in the return statement -> renders properly */
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });
        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        >
        </div>
    );
}

export default Map;