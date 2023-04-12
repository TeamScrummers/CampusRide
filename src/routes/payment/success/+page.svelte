<script>
    import { goto } from "$app/navigation";
</script>

<div style="text-align: center;">
  <div style="display: inline-block; padding: 10px;">
    <h1 style="color: green">Payment Successful</h1>
    <h3>Thank you for using CampusRide</h3>
    <button on:click={() => goto('/home')}>Go To Home</button>
  </div>
</div>