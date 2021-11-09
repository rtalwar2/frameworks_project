let host = window.location.host
console.log("ws:"+host);

let webSocket = new WebSocket("ws://localhost:8080");
webSocket.addEventListener('open', (event) => {
    console.log("SOCKET CLIENT GEOPEND");
    webSocket.send('Hallo server');
});

webSocket.addEventListener('message', (event) => {
    console.log("ONTVANGEN DATA VAN SERVER: " + event.data);
});

webSocket.addEventListener('close', () => console.log("CONNECTIE GESLOTEN TUSSEN SERVER"));

function verwerkData(array) {
    let output = ""
//console.log(array)

    if(array.length==0){
        output="sorry geen resultaat"
    }
    else {
        for (let album of array) {
            console.log(album.genre)
            output += `    <div>titel: ${album.titel}</div>
    <ul>
        <li>label:${album.label}</li>
        <li>liedjes
            <ol>`
            for (let liedje of album.liedjes) {
                output += `<li>${liedje.titel} (${liedje.duur}seconden) by ${liedje.writer}</li>`
            }


            output += `</ol>
        </li>
        <li>genre:${album.genre.naam}</li>
        <li>artiesten
            <ol>`
            for (let artiest of album.artiesten) {
                let eigenschap = ""

                output += `<li>${artiest.naam}
                    <ul>

                        <li>${artiest.geboortedatum}</li>`
                if (artiest.instrument != undefined) {
                    eigenschap = artiest.instrument
                } else {
                    eigenschap = artiest.toonhoogte
                }
                output += `<li>${eigenschap}</li></ul>
                </li></ol>`
            }
            output += `</li>
    </ul>`

        }
    }
    document.querySelector(".js_albums").innerHTML = output
}

function LaadData(url) {
    fetch(url, {
        method: "GET",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                //console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            //console.info('json object is aangemaakt');
            //console.info('verwerken data');
            verwerkData(jsonObject)
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
}





function klik(e){
    console.log("klik")
    let zoekveld=document.querySelector("#zoekveld_id")
    //console.log(zoekveld.value)
    LaadData('http://' + host + "/albums/search?"+"titel="+zoekveld.value);//get albums met bepaalde titel
    //LaadData('http://' + host + "/genres/"+zoekveld.value);//get albums met bepaalde titel

}

function keuze(){
    console.log("je hebt iets gekozen");
}

function start() {
    LaadData('http://' + host + "/albums");//get alle albums
    document.querySelector("#js_zoekbutton").addEventListener("click",klik)
    document.querySelector("#js_keuze").addEventListener("input",keuze)
}

start()
