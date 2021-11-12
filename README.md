# Project Frameworks voor serverapplicaties - Group 21



**Webapplicatie:** 

Op deze URL kan je albums bekijken: http://193.191.169.108:3000/
Op deze site heb je ook een link naar een formulier een album toe te voegen. De andere clients worden automatisch geupdated.

Op elk van de albums kan er geklikt worden. Dan krijg je de details van de albums te zien en kan je ook liedjes en artiesten toevoegen.
Dit wordt ook bij andere clients toegevoegd die naar de details van dat specifieke album aan het kijken zijn door een broadcast van de server aan de hand van websockets. Wanneer een client toch niet naar de details aan het kijken is wordt er geen overbodige fetch opnieuw gedaan, de data wordt immers opgevraagd wanneer er op een album wordt geklikt.
Ook kan er gezocht worden op titel van het album en worden dan alle albums weergegeven die de zoekterm als substring bevatten.

**REST API**

***liedjes***

De restservice werd uitvoerig getest met postman

* **GET http://193.191.169.108:3000/liedjes** | Hiermee kan je alle liedjes die opgeslagen zijn ophalen.

* **GET http://193.191.169.108:3000/liedjes/:id** | Hiermee kan je een liedje ophalen op basis van zijn id.

* **DELETE http://193.191.169.108:3000/liedjes/:id** | Hiermee wordt een liedje verwijderd

* **POST http://193.191.169.108:3000/liedjes** | Hiermee kan je een liedje toevoegen.
dit is de body :
````````
{
        "titel": "nieuw_geinsert_liedje",
        "duur": 36,
        "writer": "torchelli36"
}
````````

* **PUT http://193.191.169.108:3000/liedjes/:id** | Hiermee wordt een liedje update de body is de zelfde als bij POST

* **GET http://193.191.169.108:3000/liedjes/search?titel=:naam** | Hiermee worden alle liedjes opgehaald waar "naam" een substring van is


***genres***


* **GET http://193.191.169.108:3000/genres** | Hiermee kan je alle genres krijgen. Ook de albums worden opgehaald maar hun details(liedjes,artiesten) niet (lazy fetching)

* **GET http://193.191.169.108:3000/genres/:naam** | Hiermee kan je de data van 1 specifiek genre te zien krijgen (het was de bedoeling om de zoekfunctie op de client side hiermee uit te breiden maar door tijdsgebrek is dat niet uitgevoerd)

***albums***


* **GET http://193.191.169.108:3000/albums** | Hiermee kan je alle albums die opgeslagen zijn ophalen. De artiesten (zonder hun adres) ,het genre en de liedjes worden mee opgehaald.

* **POST http://193.191.169.108:3000/albums** | Hiermee word er een album (of een arrray van albums) toegevoegd

````
        {
        "titel": "the batels collecteriona",
        "label": "INSERTED FROM API",
        "liedjes":  [{
                        "titel": "liedje geinsert met album",
                        "duur": 36,
                        "writer": "writer1"
                    },
                    {
                        "titel": "liedje geinsert met album2",
                        "duur": 36,
                        "writer": "writer2"
                    }],
        "artiesten": [{
            "naam":"MUZIKANT geinsert met album",
            "geboortedatum":"2018-01-01",
            "adres":{
                "straat":"geinsert met album",
                "postcode":9999,
                "gemeente": "neverland",
                "land": "ALBUM INSERT LAND"
            },
            "instrument": "Albuuminstrument"
        },
        {
            "naam":"ZANGER geinsert met album",
            "geboortedatum":"2018-01-01",
            "adres":{
                "straat":"geinsert met album",
                "postcode":9999,
                "gemeente": "neverland",
                "land": "ALBUM INSERT LAND"
            },
            "toonhoogte": "Tenor"
        }],
        "genre":{
            "naam":"heavymetal_zonder_doedelzak",
            "origine":"kaas"
        }
        }
````

* **GET http://193.191.169.108:3000/albums/:id** | Hiermee kan een album op id worden opgehaald.


* **PUT http://193.191.169.108:3000/albums/:id/add** | Hiermee wordt er een liedje toegevoegd aan het album (dit kan ook weer met een array van liedjes)

````````
[   {
    "titel": "extra1",
    "duur": 36,
    "writer": "kaaas"
    },
    {
    "titel": "extra2",
    "duur": 36,
    "writer": "pindaakasmethonging"
    }
]
````````

* **DELETE http://193.191.169.108:3000/albums/:id** | Voor het verwijderen van het album (de liedjes worden dan gewone singels zonder gekoppeld te zijn aan het album)

* **GET http://193.191.169.108:3000/albums/search?titel=:naam** | Er wordt gezocht op de titel van het album en alle albums die de naam als substring bevatten worden weergegeven

* **PUT http://193.191.169.108:3000/albums/:id/add_artist** | Toevoegen van een artiest aan een album (er zijn 2 soorten artiesten[muzikant,zanger] het verschil zit in de laatste eigenschap)

````````
[{
            "naam":"INSERT-APART geinsert met album",
            "geboortedatum":"2018-01-01",
            "adres":{
                "straat":"geinsert met album",
                "postcode":9999,
                "gemeente": "neverland",
                "land": "ALBUM INSERT LAND"
            },
            "instrument": "Albuuminstrument"
        }
        ,
        {
            "naam":"INSERT-APART geinsert met album",
            "geboortedatum":"2018-01-01",
            "adres":{
                "straat":"geinsert met album",
                "postcode":9999,
                "gemeente": "neverland",
                "land": "ALBUM INSERT LAND"
            },
            "toonhoogte": "tenor"
        }]
````````
