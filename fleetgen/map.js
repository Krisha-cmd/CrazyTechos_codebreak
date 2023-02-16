
var distanceDisplay;
function string2Location(input, index) {
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    distanceDirection = new google.maps.DirectionsService();
    distanceDisplay = new google.maps.DirectionsRenderer();
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if(places.length == 0) {
            return;
        }
        markers[index].setMap(null);
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if(!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            markers[index]=new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });
            if(index == 0) {
                locations[index]=place.geometry.location;
            }
            else {
                locations[index]=place.geometry.location;
            }
            console.log(locations[index].lat() + ", " + locations[index].lng());
            if(place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        distanceDisplay.setMap(map);
        calcRoute();
    });
}
function initAutocomplete() {
    locations[0] = new google.maps.LatLng();
    locations[1] = new google.maps.LatLng();
    markers[0] = new google.maps.Marker();
    markers[1] = new google.maps.Marker();
    map = new google.maps.Map(document.getElementById('map'), {
        // Default position...
        center: {
            lat: 35.0823294,
            lng: -106.8165662
        },
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    var field=[];
    field[0] = document.getElementById('from-input');
    field[1] = document.getElementById('to-input');
    field[2] = document.getElementById('step-at');
    string2Location(field[0], 0);
    string2Location(field[2], 2);
    string2Location(field[1], 1);
    for(var i = 0;i<=2;i++) {
        // console.log(i);
        // console.log(field[i]);
        field[i].addEventListener('change', function() {
            calcRoute();
        });
        field[i].addEventListener('input', function() {
            calcRoute();
        });
        field[i].addEventListener('paste', function() {
            calcRoute();
        });
        field[i].addEventListener('cut', function() {
            calcRoute();
        });
        field[i].addEventListener('copy', function() {
            calcRoute();
        });
    }
    // google.maps.event.addDomListener(document.getElementById('submit'), 'click', calcRoute);
}
function calcDistance(start, end) {
    return(google.maps.geometry.spherical.computeDistanceBetween(start, end) / 1000).toFixed(2); //KM
}
function calcRoute() {
    // console.log("calc...");
    // console.log(locations[0].lat() + ", " + locations[0].lng());
    // console.log(locations[1].lat() + ", " + locations[1].lng());
    var start = new google.maps.LatLng(locations[0].lat(), locations[0].lng());
    var end = new google.maps.LatLng(locations[1].lat(), locations[1].lng());
    // console.log(start + ", " + end);
    if(isNaN(locations[0].lat()) === true || isNaN(locations[0].lng()) === true || isNaN(locations[1].lat()) === true || isNaN(locations[1].lng()) === true) {
        // console.log("End!");
        return;
    }
    var value_distance=document.querySelector("#value-distance");
    var value_price=document.querySelector("#value-price");
    var distance=calcDistance(start, end);
    value_distance.innerHTML=distance + " KM";
    value_price.innerHTML=(distance * 5) + " USD"; // We can use .toFixed()...
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    map.fitBounds(bounds);
    var request = {
        travelMode: google.maps.TravelMode.DRIVING,
        origin: start,
        destination: end,
    };
    distanceDirection.route(request, function(response, status) {
        if(status == google.maps.DirectionsStatus.OK) {
            distanceDisplay.setDirections(response);
            distanceDisplay.setMap(map);
        }
        else {
            // alert("Error: From " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed : " + status);
        }
    });
}
var request = {
origin: locations[0],
destination: locations[1],
travelMode: 'DRIVING'
};
function string2Location(input, index) {
var searchBox = new google.maps.places.SearchBox(input);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
});
distanceDirection = new google.maps.DirectionsService();
distanceDisplay = new google.maps.DirectionsRenderer();
searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if(places.length == 0) {
        return;
    }
    markers[index].setMap(null);
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
        if(!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        markers[index]=new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        });
        if(index == 0) {
            locations[index]=place.geometry.location;
        }
        else {
            locations[index]=place.geometry.location;
        }
        console.log(locations[index].lat() + ", " + locations[index].lng());
        if(place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    map.fitBounds(bounds);
    distanceDisplay.setMap(map);
    calcRoute();
});
}
function initAutocomplete() {
locations[0] = new google.maps.LatLng();
locations[1] = new google.maps.LatLng();
markers[0] = new google.maps.Marker();
markers[1] = new google.maps.Marker();
map = new google.maps.Map(document.getElementById('map'), {
    // Default position...
    center: {
        lat: 35.0823294,
        lng: -106.8165662
    },
    zoom: 13,
    mapTypeId: 'roadmap'
});
var field=[];
field[0] = document.getElementById('from-input');
field[1] = document.getElementById('to-input');
field[2] = document.getElementById('step-at');
string2Location(field[0], 0);
string2Location(field[2], 2);
string2Location(field[1], 1);
for(var i = 0;i<=2;i++) {
    // console.log(i);
    // console.log(field[i]);
    field[i].addEventListener('change', function() {
        calcRoute();
    });
    field[i].addEventListener('input', function() {
        calcRoute();
    });
    field[i].addEventListener('paste', function() {
        calcRoute();
    });
    field[i].addEventListener('cut', function() {
        calcRoute();
    });
    field[i].addEventListener('copy', function() {
        calcRoute();
    });
}
function calcDistance(start, end) {
return(google.maps.geometry.spherical.computeDistanceBetween(start, end) / 1000).toFixed(2); //KM
}
function calcRoute() {
// console.log("calc...");
// console.log(locations[0].lat() + ", " + locations[0].lng());
// console.log(locations[1].lat() + ", " + locations[1].lng());
var start = new google.maps.LatLng(locations[0].lat(), locations[0].lng());
var end = new google.maps.LatLng(locations[1].lat(), locations[1].lng());
// console.log(start + ", " + end);
if(isNaN(locations[0].lat()) === true || isNaN(locations[0].lng()) === true || isNaN(locations[1].lat()) === true || isNaN(locations[1].lng()) === true) {
    // console.log("End!");
    return;
}
var value_distance=document.querySelector("#value-distance");
var value_price=document.querySelector("#value-price");
var distance=calcDistance(start, end);
value_distance.innerHTML=distance + " KM";
value_price.innerHTML=(distance * 5) + " USD"; // We can use .toFixed()...
var bounds = new google.maps.LatLngBounds();
bounds.extend(start);
bounds.extend(end);
map.fitBounds(bounds);
var request = {
    travelMode: google.maps.TravelMode.DRIVING,
    origin: start,
    destination: end,
};
distanceDirection.route(request, function(response, status) {
    if(status == google.maps.DirectionsStatus.OK) {
        distanceDisplay.setDirections(response);
        distanceDisplay.setMap(map);
    }
    else {
        // alert("Error: From " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed : " + status);
    }
});
}
var request = {
origin: locations[0],
destination: locations[1],
travelMode: 'DRIVING'
};
// google.maps.event.addDomListener(document.getElementById('submit'), 'click', calcRoute);
}

