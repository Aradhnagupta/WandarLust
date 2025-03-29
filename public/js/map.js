
mapboxgl.accessToken = maptoken;
  const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 8
  });

  // Create a default Marker and add it to the map.
  const marker1 = new mapboxgl.Marker({color:'red'})
      .setLngLat(coordinates)
      .setPopup( new mapboxgl.Popup({offset:25, className: 'my-class'})
      .setHTML(`<h5> A warm Welcome! </h5> <p>Location will be provided after booking</p>`))
      .addTo(map);




  

   
