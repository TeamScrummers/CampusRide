<script>
    import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'
    import { Geocoder } from '$lib/components.js'
    import { getUserID } from '../firebase/Auth.js';
    import { updateFromDatabase } from '../firebase/Database.js';

    let options = {}
    let version = 'v4.5.1'
    let accessToken = PUBLIC_MAPBOX_TOKEN
    let types = [ 'neighborhood', 'address', 'poi' ]
    // let allTypes = [ 'country', 'region', 'postcode', 'district', 'place', 'locality', 'neighborhood', 'address', 'poi' ]
    let placeholder = 'Search'
    let customStylesheetUrl
    let value = null
    let proximity

    // Bounding box for geocoder results.
    // Later we can take user's location & +/- to get bounding box. 
    let bbox = [
        -96.50398611767645, // minLon
        30.322750148689025, // minLat
        -96.20404469261044, // maxLon
        30.861262344023288  // maxLat 
    ]

    options = {
        version,
        accessToken,
        types: types.join(','),
        placeholder,
        customStylesheetUrl,
        value,
        proximity,
        bbox,
    }

    /**
     * Updates user data with end location coordinates.
     * @param {Object} data - Geocode search result data in GeoJSON format
     */
    function updateData (data) {
        const { result } = data.detail
        const userID = getUserID();
        updateFromDatabase(`users/${userID}`, {endLocation: result.center[0] + ',' + result.center[1]});
    }
    function onLoad (data) {
        // get user geolocation
        const { result } =  data.detail
        console.log("geocoder data: " + result)
    }
    
</script>

<Geocoder options = {options} on:result={updateData} on:clear={() => null} />