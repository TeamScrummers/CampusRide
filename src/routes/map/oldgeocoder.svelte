<head>
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css">
    
    <style>
        #geocoder { z-index: 1; margin: 20px; }
        .mapboxgl-ctrl-geocoder { min-width: 100%; }
    </style>
</head>
<body>
    <div id="geocoder"></div>
    <pre id="result"></pre>
    
    <script>
        mapboxgl.accessToken = '';
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
        results.innerText = e.result.center; // returns center coords
        coords = e.result.center;
        });
        // Clear results container when search is cleared.
        geocoder.on('clear', () => {
        results.innerText = '';
        });
    </script>
</body>