<section class="content">
  <div class="container">
    <div class="content-wrap">
          <div class="section-txt" id="geocoder">
            <form>
            <Geocoder value="College Station, Texas, United States" accessToken={PUBLIC_MAPBOX_TOKEN} on:result={placeChanged} on:clear={() => mapComponent.setCenter({ lng: 0, lat: 0 })} />
            {#if place}
              <dl>
                <dt>Name:</dt>
                <dd>{place.label}</dd>
                <dt>Geolocation:</dt>
                <dd>lat: {place.geometry.lat}, lng: {place.geometry.lng}</dd>
              </dl>
            {/if}
            </form>
          </div>
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
            {#if center}
              <dt>Geolocation:</dt>
              <dd>lat: {center.lat}, lng: {center.lng}</dd>
              <dd>zoom: {zoom}</dd>
            {/if}
      </div>
    </div>
  </div>
</section>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }

  .map-wrap {
    width: 100%;
    height: 600px;
  }

</style>

<script>
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
  import { Map, Geocoder, Marker, controls } from '$lib/components.js'
  import Earthquakes from './_Earthquakes.svelte'

  const { GeolocateControl, NavigationControl } = controls
  const place = null

  let center = { lat: 30.5949963128281, lng: -96.30896051870995 }
  let marker = center
  let zoom = 11.15
  let mapComponent

  function placeChanged (e) {
    const { result } = e.detail
    mapComponent.setCenter(result.center, 14)
  }

  function recentre ({ detail }) {
    center = detail.center
  }

  function drag ({ detail }) {
    marker = detail.center
  }
</script>