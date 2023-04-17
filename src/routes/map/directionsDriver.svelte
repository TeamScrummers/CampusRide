<script>
  import { getContext } from 'svelte'
  import { contextKey } from '$lib/components.js'
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { destinationCoords, userCoords} from '../firebase/Store.js'
  // delete this later??
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

  const { getMap, getMapbox } = getContext(contextKey)
  const map = getMap()
  const mapbox = getMapbox()

  // Start / End Points for Routing
  // let start = [-96.3442924,30.5833155]
  // let endCoord = [-96.469596,30.642855];
  //let start = get(userCoords).split(',').map(Number);
  //var end = get(destinationCoords).split(',').map(Number);
  console.log("START:"+ start + " END:" + endCoord)

  async function getRoute(endCoord) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${endCoord[0]},${endCoord[1]}?steps=true&geometries=geojson&access_token=${PUBLIC_MAPBOX_TOKEN}`,
      { method: 'GET' }
    );
    
    const json = await query.json();
    console.log("Query JSON:"+ json)
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
      instructions.innerHTML = 
        `<h4><strong>Trip Distance: ${Math.floor(data.distance*0.000621371)} miles <br>
        Trip Duration: ${Math.floor(data.duration / 60)}
        min </strong></h4><ol>${tripInstructions}</ol>`;
  }

  //map.on('load', () => {
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
    const end = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: endCoord
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
                  coordinates: endCoord
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
      getRoute(endCoord);
  //});
</script>

<body>
  <div id="instructions" class = map-overlay></div>
</body>

<style>
    html {
      height: 100%;
    }
    body {
      margin: 0;
      padding: 0; 
      height: 100%;
    }
    #map { 
      position: absolute; 
      top: 0; 
      bottom: 0; 
      width: 100%; 
      margin-top: 0px;
    }
    .map-overlay {
      position: absolute;
      margin-top: 10px;
      margin-left: 10px;
      padding: 10px;
      z-index: 1;
      border: 2px solid;
      color:#000000;
      background-color: lightgray;
      position: relative;
      height: 100%;
      width: fit-content;
    }
    .instructions {
      position: absolute;
      top: 0%;
      left: 2%;
      z-index: 1;
      border: 2px solid;
      background-color: white;
      height:100%;
      width:400px;
      margin: 75px;
      position: absolute;
      font-family: sans-serif;
          }
  </style>