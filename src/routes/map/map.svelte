<svelte:head>
  <!-- Mapbox GL  -->
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" >
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <!-- Mapbox Directions -->
  <!-- <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css"> -->
  <!-- Mapbox Geocoder -->
  <!-- <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js'></script>
  <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css' type='text/css' /> -->

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

<body>
  <div id="map"></div>
  
  <script>
    // Should hide api key w/ .env file for future
    // mapboxgl.accessToken = process.env.PUBLIC_MAPBOX_TOKEN
      mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGVyeW1jZG9uYWxkIiwiYSI6ImNsYmVmaGpyODBhejUzem83ZW0xN2phM2kifQ.hStvPgYcyb-uZGuHrPMEIQ';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-96.3344,30.6280 ], // cstat lat long
        zoom: 11
      });

      // Adds geolocation button top right of page
      map.addControl(new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true}, trackUserLocation: true, showUserHeading: true}))

  </script>
  
</body>
