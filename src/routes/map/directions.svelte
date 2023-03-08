<svelte:head>
  <!-- Mapbox GL  -->
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" >
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <!-- Mapbox Directions -->
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">

  <style>
    body { margin: 0; padding: 0; }
    #map { 
      position: absolute; 
      top: 0; 
      bottom: 0; 
      width: 100%; 
      margin-top: 0px;
    }
    .map-overlay {
      position: absolute;
      top: 20%;
      left: 2%;
      z-index: 1;
      border: 2px solid;
      background-color: white;
      height:600px;
      width:400px;
      margin: 75px;
    }
  </style>
</svelte:head>

<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { destinationCoords, userCoords} from '../firebase/crStore.js';
  
  // script loading 
  function loadScript(url, callback) {
        // Adding the script tag to the head as suggested before
        onMount(() => {
        var head = document.head;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
        })
    }
  var geolocateCode = function() {
  // Should hide api key w/ .env file for future
  //mapboxgl.accessToken = process.env.PUBLIC_MAPBOX_TOKEN
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGVyeW1jZG9uYWxkIiwiYSI6ImNsYmVmaGpyODBhejUzem83ZW0xN2phM2kifQ.hStvPgYcyb-uZGuHrPMEIQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96.3344,30.6280 ], // cstat lat long
      zoom: 11
    });

    // example call: https://api.mapbox.com/directions/v5/driving-traffic/{coordinates}

    // Adds geolocation button top right of page
    map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}))

  // an arbitrary start will always be the same
  // only the end or destination will change
  let userString = get(userCoords).split(',')
  var start = userString.map(Number);
  //console.log(start)
  //var start = [-96.3344,30.6280];
  console.log(start)
  async function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  // add turn instructions here at the end
    const instructions = document.getElementById('instructions');
    const steps = data.legs[0].steps;

    let tripInstructions = '';
    for (const step of steps) {
    tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
    data.duration / 60
    )} min </strong></p><ol>${tripInstructions}</ol>`;
  }

  map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  //var coords = [-96.469596,30.642855];
  var coords = get(destinationCoords)
  const end = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
    }
    getRoute(coords);
  });
  
  // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  // var geolocate = new mapboxgl.GeolocateControl();

  // geolocate.on('geolocate', function(e) {
  //   var lon = e.coords.longitude;
  //   var lat = e.coords.latitude
  //   var position = [lon, lat];
  //   console.log(position);
  // });

  }
  // execute script load
  loadScript("https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js", geolocateCode);

</script>

<body>
  <!-- BUG: Far rightside of map isn't rendering correctly, div issues? -->
  <div id="map"></div>
</body>
