//tworzenie obiektu gry
function TicTacToeGame() {
    this.gameContainer = document.querySelector('#game-container');
    this.xUser = 'x';
    console.log(this.xUser);
    this.oUser = 'o';

    this.currentUser = this.xUser;
}

TicTacToeGame.prototype.results = [
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['c1', 'b2', 'a3'],
    ['c1', 'b2', 'a3'],
];

//przegladarka widzi klase Modal
function Modal(message, closeCallback) {
    //nowy div(odwolujemuy sie do dokumentu HTML)
    this.modalElement = document.createElement('div');
    //nadalismy mu klase
    this.modalElement.className = 'modal';
    //zwrocilismy do srodka wiadomosc
    //document.Element jest odzwieciedleniem BODY(struktura drzewiasta)
    this.modalElement.innerHTML = message;
    // wiadomosc dla przegladarki
    this.innerHTML = '<p>' + message + '</p>'
    //stworzenie elementu baton
    const closeButton = document.createElement('button');
    closeButton.innerText = 'zamknij !';



    this.closeCallback = closeCallback;






    //chcemy aby nasz przycisk zdefiniowany nasluchiwal zdarzenia ->>> w tym przypadku klikniecie
    //funkcja close nie bedzie jej widziala bo jest w innym zakresie, dlatego stosuje sie(zakres funkcji przyslania zakres zewnetrzny)
    // bind this ->> funkcja close w tym miejscu wywolana ma dzialac w zakresie tutaj, wskazuje na obiekt modelu MODEL przekazuje funkcje close
    //jak jest funkcja w innej funkcji i chcemy miec do niej dostep to napierdalanko BINDEM !
    closeButton.addEventListener('click', this.close.bind(this));
    this.modalElement.appendChild(closeButton);
    document.documentElement.appendChild(this.modalElement);

}


// jakby sie tu odwolac za pomoca kontaekstu this.modalElement
// to bedzie to samo co stworzylismy w modalu
// prototyp po modal, usuwajacy to co widzimy na ekranie

Modal.prototype.close = function () {
    this.modalElement.remove();

    if (this.closeCallback !== undefined) {
        this.closeCallback();
    }
};


// przeniesienie tutaj tworzenie tavbeli, do funkcji init,
//dzieki temu za kazdym razem kiedy doda sie init, stworzona bezie nowa tabelka i dodana bedzie do dokumentu
//funkcja inicjazujaca
TicTacToeGame.prototype.init = function () {
    const table = this.createTable()
    //najpierw musi wyczuscic zawartosci, psty string usuniecie wszystkiego co jest  na stronie a dopiero pozniej (po to zeby tabelka sie nie duplowala)
    this.gameContainer.innerHTML = '';
    this.gameContainer.appendChild(table);


    const xUser = document.querySelector("#x-user").value;
    const oUser = document.querySelector("#o-user").value;

    if (xUser !== oUser & this.win) {

        this.xUser = xUser;
        this.oUser = oUser;
        const table = this.createTable();
        this.gameContainer.innerHTML = '';
        this.gameContainer.appendChild(table);
        this.currentUser = this.xUser;
    } else if (this.win) {
        this.modal = new Modal('koniec gry');

    } else {

        this.modal = new Modal("Podaj rozne imiona")
    }

};

// dla prototypu tictacToeGame obiekt createTable
TicTacToeGame.prototype.createTable = function () {

    const table = document.createElement('table');
    ['1', '2', '3'].forEach(function (rowId) {

        const row = this.createRow(rowId);
        table.appendChild(row);
    }.bind(this));

    return table;

};

TicTacToeGame.prototype.createRow = function (rowId) {

    const row = document.createElement('tr');
    //tablica zawierajaca nazwy kolumn
    //petla iteruje sie dla kazdego stringa z kolumny nastepnie przekazuje ID to funkcji i tworzy cella
    ['a', 'b', 'c'].forEach(function (col) {


        const cell = this.createCell(col + rowId);
        row.appendChild(cell);

    }.bind(this)); // podczas wywolania zakres tej funkcji, a nie zakres for each 

    return row;

};

//stworzenie tabeli
TicTacToeGame.prototype.createCell = function (id) {
    const cell = document.createElement('td');
    cell.className = 'cell';

    //przekazujemy do niej id
    cell.id = id;
    //dodaje atrybut data-value- przechiwuje on 
    cell.dataset.value = '';
    cell.addEventListener('click', this.cellClickHandler.bind(this));

    return cell;
};

//obsluga klikniecia
TicTacToeGame.prototype.cellClickHandler = function (event) {

    // odniesienie sie do tego co wywolalo event, target z obiektu event
    const cell = event.target;
    //jak mamy to co wywolalo zdarzenie mozemy umiescic w niej jakas zawartosc
    //encja ->>> robiaca krzyzyk

    if (cell.innerHTML !== '' || this.win) {
        return;
    }

    if (this.currentUser === this.xUser) {


        this.currentUser = this.xUser;
        cell.innerHTML = "&times;";
        cell.dataset.value = "x";

        console.log('x')


    } else {
        console.log(cell.innerHTML);
        //  cell.dataset.value = "o";
        cell.innerHTML = "&cir;";
        this.currentUser = this.oUser;
    }

    this.win = this.checkResults();
    if (this.win) {
        this.modal = new Modal('Wygral ' + this.currentUser, this.init.bind(this));

    } else {

        this.currentUser = this.currentUser === this.xUser ? this.oUser : this.xUser;
    }

    this.checkResults();
};

TicTacToeGame.prototype.checkResults = function () {
    let win = false;

    for (let idx = 0; idx < this.results.length; idx++) {

        const resRow = this.results[idx];

        const result = resRow.map(function (id) {
            const cell = document.querySelector('#' + id);
            return cell.dataset.value;
            //metoda join sprawia ze w jej efekcie otrzymujemy stringa rodzielonjego tym co dostajemy z funkcji joint (czyli pusty string)
        }).join('');


        if (result === 'xxx' || result === 'ooo') {
            win = true;
            console.log('asd')


            return true;
            break;

        }

    };
}


const game = new TicTacToeGame();
const button = document.querySelector('#start-game');


const xUser = document.querySelector("#x-user");
const oUser = document.querySelector("#o-user");




function checkNames() {
button.disabled =!(xUser.value!== ''&& oUser.value !== '' )

}
xUser.addEventListener('input', checkNames);
oUser.addEventListener('input', checkNames);


button.addEventListener('click', function () {
    game.init();



});
























//document.querySelector('#start-game').addEventListener('click', function () {
  //  game.init();
//});
//const modal = new Modal('JA BUSZKO ');