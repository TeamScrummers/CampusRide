<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Display navigation directions</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
    
    <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
  </head>

  <body>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>

    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css" type="text/css">
    
    <div id="map"></div>
    
    <script>
        // Should hide api key w/ .env file for future
        //mapboxgl.accessToken = process.env.PUBLIC_MAPBOX_TOKEN
        mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGVyeW1jZG9uYWxkIiwiYSI6ImNsYmVmaGpyODBhejUzem83ZW0xN2phM2kifQ.hStvPgYcyb-uZGuHrPMEIQ';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-79.4512, 43.6568],
        zoom: 13
      });
      
      map.addControl(new MapboxDirections({accessToken: mapboxgl.accessToken}),'top-left');
      //map.addControl(geolocation, 'top-right');
    </script>

  </body>

</html>