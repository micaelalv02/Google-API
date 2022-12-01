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
    categoriaList += `<h5 class="category_list" id="">Todos</h5><hr>`
    categorias.forEach(categoria => {
        categoriaList += `<h5 class="category_list" id="${categoria.id}">${categoria.name}</h5><hr>`;
    })
    document.getElementById("hotel__names").innerHTML = categoriaList;
}


const createMarker = (hotel) => {
    let coord = new google.maps.LatLng(hotel.lat, hotel.lng);
    let searchCategory = categorias.filter((element) => element.id == hotel.categoria);
    const marker = new google.maps.Marker({
        position: coord,
        map: map,
        icon: searchCategory[0].icon
    })
    google.maps.event.addListener(marker, "click", () => {
        showModal(hotel);
    })
    markers.push(marker)
}

const showModal = (data) => {
    $("#myModal h2").html(data.name)
    $("#myModal h4").html(data.address)
    $("#myModal p").html(data.descripcion)
    $("#myModal img").attr("src", data.imagen)
    $("#myModal h6").html(data.phone)
    $("#myModal").modal("show");
}

const removeAllMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

const createLocationMarkers = (category = "") => {
    removeAllMarkers();
    let bounds = new google.maps.LatLngBounds();

    hotels.forEach(hotel => {
        if (category != "" && category != hotel.categoria) return;
        let coord = new google.maps.LatLng(hotel.lat, hotel.lng);
        bounds.extend(coord)
        createMarker(hotel);
    })
    map.fitBounds(bounds);
}

function initMap() {
    let SanFrancisco = { lat: -31.4279700, lng: -62.0826600 }
    map = new google.maps.Map(document.getElementById("map"), {
        center: SanFrancisco,
        zoom: 14,
        mapId: "713dddf179152f7c"
    })

    createLocationMarkers();
    displayListCategories()
    setListener();
}
