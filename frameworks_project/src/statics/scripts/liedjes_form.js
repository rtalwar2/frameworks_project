let host = window.location.host

const webSocket = new WebSocket("ws://"+window.location.hostname+":8080");

let albumid=localStorage.getItem("selected_album")
console.log(albumid)
function clearForm() {
    document.querySelector("#song_titel").value="";
        document.querySelector("#song_duur").value="";
document.querySelector("#song_writer").value="";
    document.querySelector("p").innerText = "invoeren gelukt";
}

function LaadData(e) {
    e.preventDefault()
    fetch('http://' + host + `/albums/${albumid}/add`, {
        method: "PUT",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "titel": document.querySelector("#song_titel").value,
            "duur": document.querySelector("#song_duur").value,
            "writer": document.querySelector("#song_writer").value
        })
    })
        .then(function (response) {
            if (!response.ok) {
                throw Error(`Probleem bij de fetch(). Status Code: ${response.status}`);
            } else {
                webSocket.send('update_specific_'+albumid);
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
    document.querySelector("#js_albumnr").innerText=albumid;

    document.querySelector("#js_voegToe").addEventListener("submit", LaadData)

}


start()
