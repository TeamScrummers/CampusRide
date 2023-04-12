<script>
    import {sendTheUserAPushNotifcation, sendDriverArrivedNotifcation, sendPassengerAvailableNotifcation, sendDriverAcceptedNotifcation} from "../firebase/PushNotifications"
</script>

<main>
	<h1>Notifications Test Page</h1>
	<a href="/">Back</a>
	<button on:click={sendTheUserAPushNotifcation}>Punch Yourself</button>
	<button on:click={sendDriverAcceptedNotifcation}>Driver Accepted</button>
	<button on:click={sendDriverArrivedNotifcation}>Driver Arrived</button>
	<button on:click={sendPassengerAvailableNotifcation}>Passenger Available</button>
</main>