<script>
    import { goto } from "$app/navigation";
</script>

<div style="text-align: center;">
  <div style="display: inline-block; padding: 10px;">
    <h1 style="color: red">Payment Canceled</h1>
    <h3>We're sorry about that, please check your email for more information.</h3>
    <button on:click={() => goto('/home')}>Go To Home</button>
  </div>
</div>