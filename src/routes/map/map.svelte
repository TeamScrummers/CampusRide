<!-- Basic MapBox Map for background -->
<div class="map-wrapper">
  <Map bind:this={mapComponent} accessToken={PUBLIC_MAPBOX_TOKEN} {center} {zoom}>
    <GeolocateControl position = {'top-right'} on:geolocate={e => null} />
  </Map>
</div>

<style>
  .map-wrapper {
    width: 100%;
    height: 100vh;
  }
</style>

<script>
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
  import { Map, controls } from '$lib/components.js'
  const { GeolocateControl } = controls
  let mapComponent
  // defaults to cstat
  export let center = { lat: 30.6280, lng: -96.3344 }
  export let zoom = 11
</script>
