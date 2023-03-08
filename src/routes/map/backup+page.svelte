<svelte:head>
  <!-- Mapbox GL  -->
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" >
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <!-- Mapbox Directions -->
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    .map-overlay {
      position: absolute;
      top: 140px;
      left: 10px;
      z-index: 1;
    }
  </style>
</svelte:head>

<body>
  <!--  FUTURE: make a container for ui elements
        pickup location (or geolocate)
        drop off location (campus/where on campus)
        latest arrival time
        Follow Uber's UI/UX flow -->
  <div class = "map-overlay" style="border: 2px solid; background-color: white;">  
    <a href="/">Back</a>
  </div>
  
  <!-- BUG: Far rightside of map isn't rendering correctly, div positioning issues? -->
  <div id="map"></div>
  <script>
    // Should hide api key w/ .env file for future
    //mapboxgl.accessToken = process.env.PUBLIC_MAPBOX_TOKEN
      mapboxgl.accessToken = '';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-96.3344,30.6280 ], // cstat lat long
        zoom: 11
      });

      // Adds directions form top left of page
      map.addControl(new MapboxDirections({accessToken: mapboxgl.accessToken}),'top-left');
      // Adds geolocation button top right of page
      map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}))
  </script>
  
</body>
