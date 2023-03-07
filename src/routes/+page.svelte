<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
</svelte:head>

<section class="content">
  <div class="container">
    <h1>Test</h1>
    <a href="/login">Login Page | </a>
    <a href="/map">Map View | </a>
    <a href="/matched">Match Found Page | </a>
    <a href="/auth">User Auth Page | </a>
    <a href="/admin">Admin TEST ONLY Page | </a>
  </div>
</section>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }
</style>
