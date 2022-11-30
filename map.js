let map;
let markers = [];

const setListener = () => {
    document.querySelectorAll(".category_list").forEach((category, index) => {
        category.addEventListener("click", (data) => {
            createLocationMarkers(data.srcElement.id)
        })
    })
}

const displayListCategories = () => {
    let categoriaList = "";
    categorias.forEach(categoria => {
        categoriaList += `<h5 class="category_list" id="${categoria.id}">${categoria.name}</h5><hr>`
    })
    document.getElementById("hotel__names").innerHTML = categoriaList;
}

// const displayHotelList = () => {
//     let hotelHTML = "";
//     listado.hotels.forEach(hotel => {
//         hotelHTML += `<h4 class="hotel__individualNames">${hotel.name}</h4>`
//     })
//     document.getElementById("hotel__names").innerHTML = hotelHTML
// }

const createMarker = (hotel) => {
    // let html = `<div class="window">
    //             <h2>${name}</h2>
    //             <div class="address">
    //                 <i class="fas fa-map-marker-alt fa-lg"></i>
    //                 <h3>${address}</h3>
    //             </div>    
    //             <div class="phone">
    //                 <i class="fas fa-phone-alt fa-lg"></i>
    //                 <h3>${phone}</h3>
    //             </div>`
    let coord = new google.maps.LatLng(hotel.lat, hotel.lng);

    const marker = new google.maps.Marker({
        position: coord,
        map: map,
        // icon: "./icons/hotel.png"
    })
    google.maps.event.addListener(marker, "click", () => {
        showModal(hotel);
        // showModal();
        // infoWindow.setContent(html);
        // infoWindow.open(map, marker)
    })
    markers.push(marker)
}

const showModal = (data) => {
    $("h2").html(data.name)
    $("h4").html(data.address)
    $("p").html(data.descripcion)
    $("src").html(data.imagen)
    $("h6").html(data.phone)
    $("#myModal").modal("show");
}

const removeAllMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

const createLocationMarkers = (category) => {
    removeAllMarkers();
    let bounds = new google.maps.LatLngBounds();

    hotels.forEach(hotel => {
        if (category != "" && category != hotel.categoria) return;
        let coord = new google.maps.LatLng(hotel.lat, hotel.lng)
        bounds.extend(coord)
        createMarker(hotel);
    })
    map.fitBounds(bounds);
}

function initMap() {
    let barcelona = { lat: 41.390205, lng: 2.154007 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: barcelona,
        zoom: 14,
        mapId: "713dddf179152f7c"
    })

    createLocationMarkers();
    displayListCategories()
    setListener();


    // let barcelona = { lat: 41.390205, lng: 2.154007 }
    // map = new google.maps.Map(document.getElementById("map"), {
    //     center: barcelona,
    //     zoom: 14,
    //     mapId: "713dddf179152f7c",
    // })
    // createLocationMarkers();
    // // console.log(hotels)
    // // const marker = new google.maps.Marker({
    // //     position: barcelona,
    // //     map: map,
    // // })

    // // infoWindow = new google.maps.InfoWindow();
    // // let html = `<h3>Centro de la ciudad</h3>`;
    // displayListCategories();
    // setListener();
}
