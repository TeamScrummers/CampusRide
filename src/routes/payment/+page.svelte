<script>
    import { get } from "firebase/database";
	async function checkout() {
		await fetch("api/stripeCheckout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
            body: JSON.stringify(
                 { items: {  price: 'price_1MvzBvG55ZoRkhwYP7dCYAn6', quantity: 1 }}
            )
		}).then((data) => {
			return data.json()
		}).then((data) => {
			window.location.replace(data.url);
		});
	}
</script>

<button on:click={() => checkout()}>Checkout with Stripe API</button>
