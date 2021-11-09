let host = window.location.host

let albumid=localStorage.getItem("selected_album")
console.log(albumid)
function clearForm() {
    document.querySelector("#song_titel").value="";
        document.querySelector("#song_duur").value="";
document.querySelector("#song_writer").value="";
    document.querySelector("p").innerText = "invoeren gelukt";
}

function LaadData() {
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

    document.querySelector("#js_voegToe").addEventListener("click", LaadData)

}


start()
