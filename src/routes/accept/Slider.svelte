<script>
  import { createEventDispatcher } from 'svelte';
  
  export let value = 50;
  const dispatch = createEventDispatcher();

  const handleChange = (event) => {
    value = event.target.value;
    if (value === '100') {
      event.target.max = 'Infinity';
    }
    dispatch('valueChanged', value);
  };
</script>

<div class="slider-container">
  <input
    type="range"
    min="0"
    max="100"
    step="5"
    value={value}
    on:input={handleChange}
    class="slider"
  />
  <p class="slider-value">{value === '100' ? '∞' : value}</p>
</div>

<style>
  .slider-container {
    display: flex;
    align-items: center;
  }

  .slider {
    width: 200px;
    margin: 0 10px;
  }

  .slider-value {
    font-size: 18px;
    font-weight: bold;
  }
</style>
