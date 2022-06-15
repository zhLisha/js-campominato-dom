/* 
- L'utente indica il livello di difficolta' tra easy, medium e hard
- Viene generata una griglia di gioco quadrata in base alla scelta dell'utente: lv.1 (1-100), lv.2 (1-81), lv.3 (1-49)
- Generare 16 numeri random da impostare come bombe senza duplicati
- Creare delle celle in base al livello scelto dall'utente
- Il gioco prevede che l'utente clicchi su una delle celle: 
    a. Se la cella cliccata e' un numero bomba: si colora di rosso ---- HAI PERSO = TERMINE GIOCO
    b. Se la cella cliccata e' un numero giusto: si colora di azzurro e continua il gioco fino a esaurimento delle          possibilita' ----- HAI VINTO = TERMINE GIOCO
- Al termine della partita, il software comunica il punteggio finale di quante celle ha cliccato giusto.
*/


// Al click del BTN PLAY il gioco inizia
// Dichiariamo la nostra variabile BTN 
const bntStartGame = document.querySelector('#start-game');
bntStartGame.addEventListener('click', startGame)

function startGame() {
    // Elementi HTML 
    const mainGrid = document.querySelector('#grid');

    // Svuotare la griglia ad nuova selezione del livello 
    mainGrid.innerHTML = '';

    // Variabile numero massimo bombe
    const maxBombs = 16;

    // SCELTA DELL'UTENTE PER LA DIFFICOLTA' DEL GIOCO
    // Rendiamo valido il valore scelto dall'utente tra EASY, MEDIUM e HARD
    const userLv = document.querySelector('#levels').value;


    // Creo una variabile con i numeri massimi per ogni livello da inserire poi nella generazione di numeri random per livello
    // Se sceglie lv.Easy i numeri sono compresi tra 1-100
    // Se sceglie lv.Medium i numeri sono compresi tra 1-81
    // Se sceglie lv.Hard i numeri sono compresi tra 1-49


    // Variabile per l'aggiunta della classe 
    let classSquare;
    // Variabile numero massimo per ogni livello
    let maxNumber;

    if(userLv === 'easy') {
        maxNumber = 100;
        classSquare = 'easy';
    } else if(userLv === 'medium') {
        maxNumber = 81;
        classSquare = 'medium';
    } else if(userLv === 'hard') {
        maxNumber = 49;
        classSquare = 'hard';
    }

    console.log(maxNumber);

   
    // GENERATORE NUMERI RANDOM BOMBA
    const bombsList = bombsNumber(1, maxNumber, maxBombs);
    // Lista totale delle 16 bombe
    console.log('Lista totale bombe:', bombsList);

    
    // Variabile numero massimo di tentativi 
    let maxAttempts = maxNumber - maxBombs;
    console.log('Tentativi massimi:', maxAttempts);

    // Generatore della griglia in base al maxNumber 
    generateSquare();
    function generateSquare() {
        // Ciclo per produrre i numeri in base a maxNumber 
        for(let i = 1; i <= maxNumber; i++){
            // Popolare la mainGrid con i contenuti del maxNumber
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `<span>${i}</span>`;
            newDiv.classList.add('squares');

             // // Aggiungere una classe per creare le dimensioni dei quadrati 
            newDiv.classList.add(classSquare);
            console.log(mainGrid);

            // Appendere alla nostra mainGrid
            mainGrid.append(newDiv);
        }
    }
}





/*************************************
                FUNCTION 
**************************************/
// Genero numeri random tra 1 e maxNumber
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// GENERAZIONE DI 16 NUMERI (RANDOM) BOMBA
// listBombsBumber ----> array in cui verranno inseriti i numeri random
// lvMaxNumber ----> variabile function: numeri random da 1 a maxNumber
// pushare nell'array listBombsBumber solo se i numeri non sono gia' presenti finche' non raggiunge un totale di: 16 elementi (in questo caso numeri)
function bombsNumber(minNumberLv, maxNumberLv, totalNumberElement) {

    // Lista array 16 bombe da riempire
    const listBombsNumber = [];

    // Ciclo per generare numeri bomba fino ad arrivare a 16 elementi non duplicati da inserire in listBombsNumber
    while(listBombsNumber.length < totalNumberElement) {

        // Dichiarata la funzione di generatore numeri random da-a
        let lvMaxNumber = randomNumber(minNumberLv, maxNumberLv);
    
        // Push solo dei lvMaxNumber non presenti ancora in listBombsNumber
        if(!listBombsNumber.includes(lvMaxNumber)) {
            listBombsNumber.push(lvMaxNumber);
        } 
    }
    return listBombsNumber;
}





