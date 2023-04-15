<!-- trip over page -->

<section class="content">
  <div class="container">
    <h1>Trip Over</h1>
    <a href="/">Back </a>
  </div>
</section>

<script>
  let isChecked = false;

  function toggleSwitch() {
    isChecked = !isChecked;
  }
</script>

<div class="toggle">
  <input
    type="checkbox"
    id="switch"
    class="checkbox"
    checked={isChecked}
    on:change={toggleSwitch}
  />
  <label for="switch">
    <p>OFF</p>
    <p>ON</p>
  </label>
</div>


<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }


</style>

