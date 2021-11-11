let host = window.location.host



function addSong(e){
    console.log(e.currentTarget.parentElement.dataset.album_id)
    localStorage.setItem('selected_album', e.currentTarget.parentElement.dataset.album_id);
    e.stopImmediatePropagation()
    window.open("./liedjes_form.html", "_self");
}
function addArtist(e){
    console.log(e.currentTarget.parentElement.dataset.album_id)
    localStorage.setItem('selected_album', e.currentTarget.parentElement.dataset.album_id);
    e.stopImmediatePropagation()
    window.open("./artist_form.html", "_self");
}

function showDetail(id,album) {
    console.log(id)
    console.log(album)
    output = `<div class="js_album" data-album_id="${album.id}">titel: ${album.titel}
    <ul>
        <li>label:${album.label}</li>
        <li>liedjes
            <ol>`
    if(album.liedjes!=undefined) {
        for (let liedje of album.liedjes) {
            output += `<li>${liedje.titel} (${liedje.duur}seconden) by ${liedje.writer}</li>`
        }
    }

    output += `</ol>
        </li>
        <li>genre:${album.genre.naam}</li>
        <li>artiesten
            <ol>`
    if(album.artiesten !=undefined) {
        for (let artiest of album.artiesten) {
            let eigenschap = ""

            output += `<li>${artiest.naam}
                    <ul>

                        <li>${artiest.geboortedatum}</li>`
            if (artiest.instrument !== undefined) {
                eigenschap = artiest.instrument
            } else {
                eigenschap = artiest.toonhoogte
            }
            output += `<li>${eigenschap}</li></ul>
                </li>`
        }
    }
    output += `</ol></li>
    </ul>
        <button class="voeg_liedje_toe" data-liedje_toevoeg_id="${id}" type="button">voeg liedjes toe!</button>
        <button class="voeg_artiesten_toe" data-artiest_toevoeg_id="${id}" type="button">voeg artiesten toe!</button>
</div>`
    let div=document.querySelector(`[data-album_id="${id}"]`)
    console.log(div)
    div.classList.add("js_detail")
    div.innerHTML = output;
    document.querySelectorAll(".voeg_liedje_toe").forEach(el=>el.addEventListener("click",addSong))
    document.querySelectorAll(".voeg_artiesten_toe").forEach(el=>el.addEventListener("click",addArtist))

}


function getDetail(e) {
    let id=e.currentTarget.dataset.album_id

    fetch('http://' + host + '/albums/' + e.currentTarget.dataset.album_id, {
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
                console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            console.info('json object is aangemaakt');
            console.info('verwerken data');
            console.log("id van opgevraagde album is "+ id)
            showDetail(id,jsonObject)
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
}


function verwerkAlbumShort(array) {
    let output = ""
    if (array.length == 0) {
        output = "sorry geen resultaat"
    } else {
        for (let album of array) {
            output += `    <div class="js_album" data-album_id="${album.id}">titel: ${album.titel}
    <ul>
        <li>label: ${album.label}</li>
    </ul></div>`
        }
    }
    document.querySelector(".js_albums").innerHTML = output
    document.querySelectorAll('.js_album').forEach(element => element.addEventListener("click",getDetail))
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
                console.info('Er is een response teruggekomen van de server');
                return response.json();
            }
        })
        .then(function (jsonObject) {
            console.info('json object is aangemaakt');
            console.info('verwerken data');
            verwerkAlbumShort(jsonObject)
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
        });
}


/////////////////////////////////

const webSocket = new WebSocket("ws://localhost:8080");
webSocket.addEventListener('open', (event) => {
    console.log("SOCKET CLIENT GEOPEND");
    webSocket.send('Hallo server');
});

webSocket.addEventListener('message', (event) => {
    console.log("ONTVANGEN DATA VAN SERVER: " + event.data);
});

webSocket.addEventListener('close', () => console.log("CONNECTIE GESLOTEN TUSSEN SERVER"));
/////////////////////////////////

function klik(e) {
    console.log("klik")
    let zoekveld = document.querySelector("#zoekveld_id")
    console.log(zoekveld.value)
    let params=new URLSearchParams({"titel": zoekveld.value}).toString()
    LaadData('http://' + host + "/albums/search?" + params);//get albums met bepaalde titel
    //LaadData('http://' + host + "/genres/"+zoekveld.value);//get albums met bepaalde genre
}

function keuze(e) {
    console.log("je hebt iets gekozen");

}

function start() {
    console.log("hallo")
    LaadData('http://' + host + "/albums");//get alle albums
    document.querySelector("#js_zoekbutton").addEventListener("click", klik)
    document.querySelector("#js_keuze").addEventListener("input", keuze)
}
start()
