# Miniprojekt 1 i kursen JavaScript 2

## Syfte med projektet:
- Skapa ett spel med hjälp av JavaScript
- Hämta information från en databas i Firebase
- Jämföra och uppdatera informationen i databasen beroende på resultatet i spelet

  
## Beskrivning
Utveckla ett sten-sax-påse-spel där målet är att vinna så många omgångar i rad som möjligt. Spelet ska ha en highscore-lista där spelarna med de 5 högsta poängen visas. 

Detta projekt utgår från spelet jag gjorde i kursen JavaScript 1: https://annasundbergg.github.io/annasundbergg-FE22-js1-mp2-anna-sundberg/

## Krav

### Spelregler
- Varje gång spelaren vinner över ‘datorn’ får spelaren ett poäng.
- Om datorn vinner går spelarens poäng ner till noll och spelet startar om. 
- Datorn kan alltså aldrig få något poäng utan spelet går ut på att vinna över datorn så många gånger som möjligt i följd.

### GUI
- En highscore med topp 5 poäng ska visas på sidan. Denna ska hämtas från firebase.
- Användaren ska ange sitt namn innan spelet börjar.
- Användaren ska välja sten, sax, eller påse genom att klicka på ett val.
- Spelarens och datorns val ska visas.
- Det ska visas vem vinnaren är vid varje omgång.
- Spelarens poäng ska visas.

### Highscore
- I firebase ska det finnas en lista på topp 5 scores.
- Varje score-objekt i listan ska ha egenskaperna
  - name
  - score
- När ‘datorn’ har vunnit ska spelarens nya poäng jämföras med highscore-listan.
- Om spelarens nya poäng platsar på listan ska den nya poängen läggas till på rätt plats i databasen med spelarens namn. (Använd namnet som användaren angett i början av spelet.)
- Highscore-listan på webbsidan uppdateras
