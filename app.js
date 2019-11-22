const filters = () => {
    console.log("entra");
    fetch(
        "https://cors-anywhere.herokuapp.com/https://api-gas-stations-mex.herokuapp.com/gasstations"
    )
    .then(response => response.json())
    .then(locations => {
        console.log("Todaaa: ",locations);
        traeTipos(locations);
    });
};

const traeTipos = (data) => {
    let tipos = [];
    data.forEach(items => {
        if(items.gas_price !== undefined){
            if(tipos.find(ele => ele === items.gas_price.type) === undefined){
                if(items.gas_price.type !== undefined){
                    tipos.push(items.gas_price.type);
                }
            }
        }
    });
    console.log("tipos: ", tipos);
};

const getLocations = () => {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api-gas-stations-mex.herokuapp.com/gasstations"
  )
    .then(response => response.json())
    .then(locations => {
      let locationsInfo = [];

      locations.forEach(location => {
        let locationData = {
          position: {
            lat: Number(location.location.x),
            lng: Number(location.location.y)
          },
          name: location.location.name
        };
        locationsInfo.push(locationData);
      });
      console.log(locationsInfo);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(data => {
          let currentPosition = {
            lat: data.coords.latitude,
            lng: data.coords.longitude
          };
          dibujarMapa(currentPosition, locationsInfo);
        });
      }
    });
};

const dibujarMapa = (obj, locationsInfo) => {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: obj
  });

  let marker = new google.maps.Marker({
    position: obj,
    title: "Tu ubicacion"
  });
  marker.setMap(map);

  let markers = locationsInfo.map(place => {
    return new google.maps.Marker({
      position: place.position,
      map: map,
      title: place.name
    });
  });
};
window.addEventListener("load", getLocations);
window.addEventListener("load", filters);
function noGet() {
  alert("Porfavor habilita el permiso para compartir ubicación");
}

