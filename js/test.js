var Levels = {
    first: {
        rows: 2,
        columns: 2
    },

    second: {
        rows: 2,
        columns: 3
    },

    third: {
        rows: 3,
        columns: 4
    },

    fourth: {
        rows: 4,
        columns: 5
    },

    fifth: {
        rows: 4,
        columns: 7
    }
}

var shirt = {
    black: 'black',
    broun: 'broun',
    blue: 'blue' 
}

class Card {
    constructor(data) {
        this.data = data;
    }

    add(data) {
        new Card(data);      
    }

    getData() {     
        return this.data;
    }

    paint(place, shirt) {
        var divFlipContainer = document.createElement('div'),
        divFlipper = document.createElement('div'),
        divFront = document.createElement('div'),
        divBack = document.createElement('div');

        divFlipContainer.setAttribute('class', 'flip-container');
        divFlipContainer.setAttribute('data', this.data);
        divFlipper.setAttribute('class', 'flipper');
        divFront.setAttribute('class', 'front ' + shirt);
        divBack.setAttribute('class', 'back');
        divBack.setAttribute('style', 'background-image: url(img/card-' + this.data +'.jpg');

        place.appendChild(divFlipContainer);
        divFlipContainer.appendChild(divFlipper);
        divFlipper.appendChild(divFront);
        divFlipper.appendChild(divBack);
    }

}

function startGame() {
    let form = document.forms.controls,
        level = form.level.value,
        card_shirt = form.card_shirt.value;
    
    popup.classList.add('hidden');

    makeLevel(level, card_shirt);
    return false;
}

function makeLevel(level, shirt) {
    var rows = Levels[level].rows,
        columns = Levels[level].columns,
        count = 0,
        oldTabel = document.getElementsByTagName('table');
    
    if (oldTabel[0]) maingame.removeChild(oldTabel[0]);

    cards = generateCard(rows*columns);

    table = document.createElement('table');
    maingame.appendChild(table);
 
    for (let i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        table.appendChild(tr);

        for (let j = 0; j < columns; j++) {
            var td = document.createElement('td')
            tr.appendChild(td);
            cards[count].paint(td, shirt);
            count++;
        }
    }
}

function generateCard(num) {
    var arr = [],
        data = 1;

    for (let i = 0; i <num; i++ ) {
        if (i%2 == 0 && i != 0) data++;
        arr[i] = new Card(data);
    }

    return arr.sort(x => Math.random() - 0.5);
}

var getData = function(e){
    var target = e.target,
        data = 0;

    while (target.getAttribute('data') == null) {
        if (target != maingame) target = target.parentNode;
        else return;      
    }
    
    if (target.className.indexOf(' flip') == -1 && target.className.indexOf(' find') == -1 ) {
        data = target.getAttribute('data');
        targetDivs.push(target);
    }
    else return;

    target.classList.add('flip');
    clearStyle('flip') && target.classList.add('flip');
    console.log(data);
    console.log(targetDivs);
    findPare();
    winner();
}

var targetDivs = [];

function clearStyle(className) {
    var cards = maingame.getElementsByClassName('flip-container');
        cardsTarget = maingame.getElementsByClassName(className);

    if (cardsTarget.length > 2) {
        [].forEach.call(cards, x => x.classList.remove(className))
        return true;
    }
}

function findPare() {
    if (targetDivs.length == 2 && targetDivs[0].getAttribute('data') == targetDivs[1].getAttribute('data')) {
        targetDivs[0].classList.add('find');
        targetDivs[1].classList.add('find');
        targetDivs=[];
    }
    else if (targetDivs.length == 2) targetDivs=[];
}

function winner() {
    var findedPars = document.getElementsByClassName('find'),
        allElem = document.getElementsByClassName('flip-container');
        
    if (findedPars.length == allElem.length - 2) {
        [].forEach.call(allElem, x => x.classList.add('flip','find'));
        popup.classList.remove('hidden');
    }
}

// maingame.addEventListener('click', getData);
maingame.addEventListener('click', getData);
//window.addEventListener('load',makeLevel('fifth', 'black'))

