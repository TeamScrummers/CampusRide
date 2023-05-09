<script>
  import { goto } from "$app/navigation";
</script>

<div style="text-align: center;">
  <div style="display: inline-block; padding: 10px;">
    <h1 style="color: red"><strong>Payment Canceled</strong></h1>
    <h3>We're sorry about that, please check your email for more information.</h3>
    <button button type="button" class="mode-button" on:click={() => goto('/login')}>Reset App</button>
  </div>
</div>

<style>
.mode-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.mode-button:hover {
  background-color: #3e8e41;
}
</style>