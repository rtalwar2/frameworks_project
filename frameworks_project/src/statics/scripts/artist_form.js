let host = window.location.host


let albumid = localStorage.getItem("selected_album")
console.log(albumid)
let labelnaam = "toonhoogte";

function clearForm() {
    document.querySelector("#artist_naam").value = "";
    document.querySelector("#artist_geboortedatum").value = "";
    document.querySelector("#artist_straat").value = "";
    document.querySelector("#artist_postcode").value = "";
    document.querySelector("#artist_gemeente").value = "";
    document.querySelector("#artist_land").value = "";
    document.querySelector("#artist_specificatie").value = "";
    document.querySelector("p").innerText = "invoeren gelukt";
}

function LaadData() {
    console.log(labelnaam)
    let obj = {
        "naam": document.querySelector("#artist_naam").value,
        "geboortedatum": document.querySelector("#artist_geboortedatum").value,
        "adres": {
            "straat": document.querySelector("#artist_straat").value,
            "postcode": document.querySelector("#artist_postcode").value,
            "gemeente": document.querySelector("#artist_gemeente").value,
            "land": document.querySelector("#artist_land").value,
        }
    }
    obj[labelnaam] = document.querySelector("#artist_specificatie").value
    console.log(obj)
    fetch('http://' + host + `/albums/${albumid}/add_artist`, {
        method: "PUT",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                console.info('Er is een response teruggekomen van de server');
                clearForm();
            }
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
            document.querySelector("p").innerText = "invoeren mislukt";

        });
}

function klik(event) {
    console.log(event.target.value)
    labelnaam = event.target.id
    if (event.target.value == "muzikant") {
        document.querySelector("#js_specificatie").innerHTML = `<label for="artist_specificatie">instrument: </label>
<input type="text" id="artist_specificatie"><br>`
    } else {
        document.querySelector("#js_specificatie").innerHTML = `<label for="artist_specificatie">toonhoogte: </label>
<input type="text" id="artist_specificatie"><br>`
    }
}

function start() {
    document.querySelector("#js_albumnr").innerText = albumid;
    document.querySelectorAll('input[type="radio"]').forEach(el => el.addEventListener("click", klik))
    document.querySelector("#js_voegToe").addEventListener("click", LaadData)

}


start()
