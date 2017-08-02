// Get Weather Button Event

$('button').on('click', function(e) {
    var lat = $('#latitude').val(),
        long = $('#longitude').val(),
        city_name = $('#city-search').val()

    // If the latitude and longitude inputs aren't empty
    // then continue with the code. Otherwise report error to user.
    if (lat && long !== '') {
        e.preventDefault();
    }
});

// =================================================
// Report City & AutoFill Coords
// =================================================

function insertGoogleScript() {
    var google_api = document.createElement('script'),
        api_key = 'AIzaSyBmkK6sZyEm-Jvo3tGG8ZKIi75Y9rQquME';

    // Inject the script for Google's API and reference the initGoogleAPI
    // function as a callback.
    google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
    document.body.appendChild(google_api);
}


// SearchBox Method
function initGoogleAPI() {
    var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

    autocomplete.addListener('places_changed', function() {
        var place = autocomplete.getPlaces()[0];
        document.querySelector("#latitude").value = place.geometry.location.lat();
        document.querySelector("#longitude").value = place.geometry.location.lng();
    });
}

insertGoogleScript();