let host = window.location.host

const webSocket = new WebSocket("ws://localhost:8080");

function clearForm() {
    document.querySelector("#album_titel").value = "";
    document.querySelector("#album_label").value = "";
    document.querySelector("#genre_naam").value = "";
    document.querySelector("#genre_origine").value = "";
    document.querySelector("p").innerText = "invoeren gelukt";
}

function LaadData() {
    fetch('http://' + host + "/albums", {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "titel": document.querySelector("#album_titel").value,
            "label": document.querySelector("#album_label").value,
            "genre": {
                "naam": document.querySelector("#genre_naam").value,
                "origine": document.querySelector("#genre_origine").value,
            }
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                webSocket.send('update');
                console.info('Er is een response teruggekomen van de server');
                clearForm();
            }
        })
        .catch(function (error) {
            console.error(`fout bij verwerken json ${error}`);
            document.querySelector("p").innerText = "invoeren mislukt";

        });
}

function start() {

    document.querySelector("#js_voegToe").addEventListener("click", LaadData)
}

start()
