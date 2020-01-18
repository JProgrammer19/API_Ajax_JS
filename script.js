var xmlHttp;
onload = cargarInfoSitio;

//Configuración
const ID_LUGAR = "ChIJAQAAANAxQg0R786FD-old24";
const CLAVE_API_GOOGLE_PLACES = "AIzaSyCLOHSqoImaw6XfjMNFETLoAFdM6WSWZ6w";
const URI = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + ID_LUGAR + "&key=" + CLAVE_API_GOOGLE_PLACES;

function cargarInfoSitio() {

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = procesarEventosRecibir;
    xmlHttp.open('GET', URI, true);
    xmlHttp.send(null);
}

function procesarEventosRecibir() {

    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var cuerpo = xmlHttp.responseText;
            var objeto_js = JSON.parse(cuerpo);

            //Datos API
            var nameAirport = document.getElementById("nombre").innerHTML = '' + objeto_js.result.name;
            var direccion = document.getElementById("direccion").innerHTML = '' + objeto_js.result.formatted_address;
            var tel = document.getElementById("telefono").innerHTML = '' + objeto_js.result.formatted_phone_number;
            var icon = document.getElementById("logo").src = '' + objeto_js.result.icon;
            var website = document.getElementById("website");
            var horario = new Array();
            linkweb(objeto_js.result.website);
            horario = objeto_js.result.opening_hours.weekday_text;
            var horarioString = horario.toString();
            var arrHorario = horarioString.split(',');
            horario_ordenado(arrHorario);

        } else {
            console.log("error " + xmlHttp.status);
        }

    }
}


function linkweb(linkwebsite) {
    var link = document.createElement("a"); //Create Element tag a <a>
    link.setAttribute("href", linkwebsite); //attributes href
    link.setAttribute("target", "_blank"); //attributes href
    var texto = document.createTextNode("Aeropuerto información web"); // <a>ver web</a>
    link.appendChild(texto); //print text
    website.appendChild(link); //print element and url  
}

function horario_ordenado(arrHorario) {

    var ul = document.createElement("ul");
    for (var i = 0; i < 6; i++) {
        var li = document.createElement("li");
        li.innerHTML = '' + arrHorario[i];

        ul.appendChild(li);
    }
    document.getElementById("horarios").appendChild(ul);

}