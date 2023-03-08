<!-- default page -->
<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
  <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js'></script>
</svelte:head>

<section class="content">
  <div class="container">
    <h1>Default Testing Page</h1>
    <a href="/login">Landing Page | </a>
    <a href="/home">Home Page | </a>
    <a href="/login">Login Page | </a>
    <a href="/map">Map View | </a>
    <a href="/matched">Match Found Page | </a>
    <a href="/auth">User Auth Page | </a>
    <a href="/admin">Admin TEST ONLY Page | </a>
    <a href="/trippickup">Trip Pick Up | </a>
    <a href="/tripenroute">Trip Enroute | </a>
    <a href="/tripover">Trip Over | </a>
  </div>
</section>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }
</style>
