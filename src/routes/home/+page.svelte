<!-- home page -->
<!-- Preloading Mapbox Scripts -->
<svelte:head>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
  <script type="module" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"></script>
</svelte:head>

<section class="content">
  <div class="container">
    <h1>CampusRide Homepage</h1>
    <a href="/login">Log Out</a>
    <br><br>
  </div>
  <div class = "container"><button type="button" on:click={null}>FIND RIDE</button></div>
</section>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }
</style>
