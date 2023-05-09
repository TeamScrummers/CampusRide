<script>
  import { goto } from "$app/navigation";
  if (!import.meta.env.SSR) {
    goto('/login')
  }
</script>

<style>
  :global(#logo svg) {
    fill: white;
    height: 60px;
  }
</style>
