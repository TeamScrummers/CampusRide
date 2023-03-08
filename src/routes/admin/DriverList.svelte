<!-- Togglable button to display html elements -->
<script>
    import { createEventDispatcher } from 'svelte';

let shown = false;

    let dispatch = createEventDispatcher();

  export function show() {
    shown = !shown;
            dispatch('show', shown);
    }
</script>

<svelte:options accessors={true}/>

<button on:click={show}>Generate Driver List</button>

{#if shown}
<slot/>
{/if}