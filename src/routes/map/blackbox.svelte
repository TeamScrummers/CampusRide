<script>
  import { getContext, onMount } from 'svelte'
  import { contextKey } from '$lib/components.js'

  const { getMap, getMapbox } = getContext(contextKey)
  const map = getMap()
  const mapbox = getMapbox()

  const blackLayer = {
    id: 'black-layer',
    type: 'background',
    paint: {
      'background-color': 'black'
    }
  };
  onMount(() => {
    map.addLayer(blackLayer);
  });

</script>