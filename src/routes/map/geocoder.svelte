<svelte:head>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
    
    <style>
        #geocoder { z-index: 1; margin: 20px; padding: 10px}
        .mapboxgl-ctrl-geocoder { min-width: 100%; }
    </style>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { destinationCoords } from '../firebase/Store.js'
    import { updateFromDatabase } from '../firebase/Database.js';
    import { getUserID } from '../firebase/Auth.js';

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

    // stored into function to insure script loading
  var geolocateCode = function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGVyeW1jZG9uYWxkIiwiYSI6ImNsYmVmaGpyODBhejUzem83ZW0xN2phM2kifQ.hStvPgYcyb-uZGuHrPMEIQ';
        var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
    });
    geocoder.addTo('#geocoder');
    // Get the geocoder results container.
    var results = document.getElementById('result');
    var coords
    // Add geocoder result to container.
    geocoder.on('result', (e) => {
    //results.innerText = JSON.stringify(e.result, null, 2); // returns whole result as string json
    //results.innerText = e.result.center; // returns center coords
    coords = e.result.center;
    destinationCoords.set(coords)
    const userID = getUserID();
    updateFromDatabase(`users/${userID}`, {endLocation: coords[0]+','+coords[1]});
    });
    // Clear results container when search is cleared.
    geocoder.on('clear', () => {
    results.innerText = '';
    });
  };

  // execute
  loadScript("https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js", geolocateCode);
</script>

<body>
    <div id="geocoder"></div>
    <pre id="result"></pre>
</body>