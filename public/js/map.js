
  
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12", //style url
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9// starting zoom
    });



// console.log(coordinates);

//copied code from this
//https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/

  // Create a default Marker and add it to the map.

    const marker = new mapboxgl.Marker({color :"red"})
        .setLngLat(listing.geometry.coordinates) //listing.geometry.coordinates
        //code copied from https://docs.mapbox.com/mapbox-gl-js/api/markers/ in popup example last lines
        .setPopup( new mapboxgl.Popup({offset: 25})
    .setHTML(
        `<h4>${listing.location}</h4><p>Exact location will be  provided after booking</p>`
    )
  )
        .addTo(map);