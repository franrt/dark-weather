$(document).ready(function() {


    // Evento del botón, para conseguir la data de latitud y longitud

    $('#btn-geo').click(function(e) {
        console.log("okidoki");
        $(".land").empty();

        var lat = $('#latitud').val();
        var long = $('#longitud').val();
        var city = $('#city-search').val();

        console.log(lat);
        console.log(long);
        console.log(city);

        var urlClima = ('https://api.darksky.net/forecast/adc03537205c5de8b363a69634ce248b/' + lat + ',' + long + '?exclude=minutely,hourly,flags&lang=es&units=auto');

        // si la data está ingresada, continuar con el código, de lo contrario, avisa al usuario
        if (lat && long !== '') {
            e.preventDefault();
        }

        //acá quise tomar el val() del input pero entrega object-object :( 

        $.getJSON(urlClima, function(data) {
            var resumen = data.summary;
            var icon = data.icon;
            var temp = data.temperature;
            var viento = data.windSpeed;
            var humedad = data.humidity;
            var uv = data.uvIndex;
            var presion = data.pressure;
            console.log(resumen);
        });






    });
    // Funcion para conseguir datos desde la api de google maps

    function insertGoogleScript() {
        var google_api = document.createElement('script'),
            api_key = 'AIzaSyBmkK6sZyEm-Jvo3tGG8ZKIi75Y9rQquME';

        //crea el script para obtener la api de google maps en el body
        google_api.src = 'https://maps.googleapis.com/maps/api/js?key=' + api_key + '&callback=initGoogleAPI&libraries=places,geometry';
        document.body.appendChild(google_api);
    }


    // Método de autocompletado automático de la ciudad y obtención de geolocalización
    function initGoogleAPI() {
        var autocomplete = new google.maps.places.SearchBox(document.querySelector("#city-search"));

        autocomplete.addListener('places_changed', function() {
            var place = autocomplete.getPlaces()[0];
            document.querySelector("#latitud").value = place.geometry.location.lat();
            document.querySelector("#longitud").value = place.geometry.location.lng();
        });
    }


    insertGoogleScript();




    var dibujaClima = '<div class="clima text-center">' +
        '<div class="row"><div class="col s12">' + icon + '</div>' +
        '<div class="row"><div class="col s12">' + city + '</div>' +
        '<div class="row"><div class="col s12">' + '<p>TEMPERATURA</p>' + temp + '</div>' +
        '<div class="row"><div class="col s12">' + '<p>VIENTO</p>' + viento + '</div>' +
        '<div class="row"><div class="col s12">' + '<p>HUMEDAD</p>' + humedad + '</div>' +
        '<div class="row"><div class="col s12">' + '<p>ÍNDICE UV</p>' + uv + '</div>' +
        '<div class="row"><div class="col s12">' + '<p>PRESION</p>' + presion + '</div></div>'



    $(".land").append(dibujarClima);


});