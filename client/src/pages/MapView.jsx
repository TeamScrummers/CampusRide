import React from 'react';
import './MapView.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
//import { Link } from "react-router-dom";

// Later our mapbox token is hidden in an .env file, for now it be plainly put here. 
//mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGVyeW1jZG9uYWxkIiwiYSI6ImNsYmVmaGpyODBhejUzem83ZW0xN2phM2kifQ.hStvPgYcyb-uZGuHrPMEIQ';

class MapView extends React.Component {

  componentDidMount() {

    // Creates new map instance
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-73.985664, 40.748514],
      zoom: 12
    });

    // Creates new directions control instance
    // https://docs.mapbox.com/api/navigation/directions/#retrieve-directions

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Integrates directions control with map
    map.addControl(directions, 'top-left');

    // Creates a new Geolocation control instance
    // https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol
    const geolocation = new mapboxgl.GeolocateControl ({
      positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })

    // Integrates directions control with map
    map.addControl(geolocation, 'top-right');
  }

  render() {
    return (
      <div>
      {/* Populates map by referencing map's container property */}
      <div ref={el => (this.mapWrapper = el)} className="mapWrapper" /> 
      {/* <button className="addHome">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Back to Landing
        </Link>
      </button> */}
      </div>
      );
  }
}

export default MapView;
