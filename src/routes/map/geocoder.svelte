<script>
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
    import { Geocoder } from '$lib/components.js'
    import { getUserID } from '../firebase/Auth.js';
    import { updateFromDatabase } from '../firebase/Database.js';

    /**
     * Updates user data with end location coordinates.
     * @param {Object} data - Geocode search result data in GeoJSON format
     */
    function updateData (data) {
        const { result } = data.detail
        const userID = getUserID();
        updateFromDatabase(`users/${userID}`, {endLocation: result.center[0]+','+result.center[1]});
    }
</script>

<Geocoder value="" accessToken={PUBLIC_MAPBOX_TOKEN} on:result={updateData} on:clear={() => null} />