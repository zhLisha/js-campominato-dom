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
    const userMessage = document.querySelector('#user-score');

    // Svuotare la griglia ad nuova selezione del livello 
    mainGrid.innerHTML = '';
    userMessage.innerHTML = '';

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

   
    // GENERATORE NUMERI RANDOM BOMBA
    const bombsList = bombsNumber(1, maxNumber, maxBombs);

    
    // Variabile numero massimo di tentativi 
    let maxAttempts = maxNumber - maxBombs;


    // Array punteggio finale con tutti i numeri giusti dati dal cliente
    const correctNumbers = [];


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

            // Dichiaro la funzione se il numero cliccato e' giusto o sbagliato
            newDiv.addEventListener('click', userClickSquare);

            // Appendere alla nostra mainGrid
            mainGrid.append(newDiv);
        }
    }


    // Funzione per determinare se il numero selezionato dall'utente e' giusto (azzurro) o sbagliato (rosso)
    function userClickSquare() { 

        // leggere il valore del numero selezionato dall'utente
        const singleNumber = parseInt(this.querySelector('span').innerHTML);

    
        // Se il numero e' incluso nella bombList, allora lo square diventa rosso = hai perso, dine del gioco
        if(bombsList.includes(singleNumber)) {
            this.classList.add('red');
            userMessage.innerHTML = `Mi dispiace, hai perso! Il tuo punteggio ??: ${correctNumbers.length}`;
            noClickAnymore();
        } else {
            // Se il numero e' corretto allora lo si aggiunge all'array correctNumbers e lo square diventa azzurro
            // Se il numero e' giusto, lo square diventa azzurro
            if(!bombsList.includes(singleNumber)) {
                this.classList.add('blue');
                correctNumbers.push(singleNumber);
            }

            // Finiti i maxAttempt, fine del gioco = hai vinto
            if(correctNumbers.length === maxAttempts) {
                userMessage.innerHTML = `Congratulazioni, hai vinto!Il tuo punteggio ??: ${correctNumbers.length}`;
                noClickAnymore();
            }
        }
    }

    // Funzione che rende non piu' cliccabile il gioco dopo
    function noClickAnymore() {
        // Richiamo tutte le caselle con classe .square
        const allSquares = document.querySelectorAll('.squares');
        
        for(let i = 0; i < allSquares.length; i++){
            const singleSquare = allSquares[i];

            
            // Se il numero e' compreso tra le bombe gli aggiungo la classe red per far uscire tutti i numeri bomba allo scoperto
            const allSquareNumber = parseInt(singleSquare.querySelector('span').innerHTML);
            if(bombsList.includes(allSquareNumber)) {
            singleSquare.classList.add('red');
            }
            // Rendo non cliccabile le caselle alla fine del gioco sia che abbia vinto o perso
            singleSquare.style.pointerEvents = 'none';
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




