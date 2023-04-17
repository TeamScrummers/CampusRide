            <div class="section-txt" id="map">
              <div class="map-wrap">
                <Map
                  bind:this={mapComponent}
                  accessToken={PUBLIC_MAPBOX_TOKEN}
                  on:recentre={recentre}
                  on:drag={drag}
                  {center}
                  bind:zoom
                >
                  <Earthquakes />
                  <NavigationControl />
                  <GeolocateControl on:geolocate={e => console.log('geolocated', e.detail)} />
                  <Marker lat={marker.lat} lng={marker.lng} />
                </Map>
              </div>
            </div>
  
  <style>
    :global(#logo svg) {
      fill: white;
      height: 60px;
    }
  
    .slogan {
      margin-top: 14px;
    }
  
    .map-wrap {
      width: 100%;
      height: 300px;
    }
  
    .action-buttons {
      display: flex;
      justify-content: space-between;
    }
  
    #fly-to,
    #change-zoom {
      display: block;
      position: relative;
      margin: 0px auto;
      height: 40px;
      padding: 10px;
      border: none;
      border-radius: 3px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      background: #ee8a65;
    }
  
  </style>
  
  <script>
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
    import { Map, Geocoder, Marker, controls } from '$lib/components.js'
    import Earthquakes from './_Earthquakes.svelte'
  
    const { GeolocateControl, NavigationControl } = controls
    const place = null
  
    let page = 'about'
    let center = { lat: 53.3358627, lng: -2.8572362 }
    let marker = center
    let zoom = 11.15
    let mapComponent
  
    function navigate (next) {
      page = next
    }
  
    function placeChanged (e) {
      const { result } = e.detail
      mapComponent.setCenter(result.center, 14)
    }
    
    function randomLng () {
      return 77 + (Math.random() - 0.5) * 30
    }
  
    function randomLat () {
      return 13 + (Math.random() - 0.5) * 30
    }
  
    function flyToRandomPlace () {
      mapComponent.flyTo({
        center: [
          randomLng(),
          randomLat()
        ],
        essential: true
      })
    }
  
    function recentre ({ detail }) {
      center = detail.center
    }
  
    function drag ({ detail }) {
      marker = detail.center
    }
  </script>