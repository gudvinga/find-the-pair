import {generateLevel} from './levels.js';
import {shirt} from './shirt.js';
import Card from './cards.js';
import Timer from './timer.js';

const timer = new Timer();

var welcomeScreen = document.querySelector('.welcome-screen'),
    bodyGame = document.querySelector('.gameBody')

function startGame(e) {
    e.preventDefault();
    welcomeScreen.classList.add('display-none');
    bodyGame.classList.remove('display-none');
    
    let form = document.forms.controls,
        level = +form.level.value,
        card_shirt = form.card_shirt.value,
        Level = generateLevel(level);
    
    popup.classList.add('hidden');

    makeLevel(Level, card_shirt);
    timer.startTimer();
}

function makeLevel(Level, shirt) {
    var rows = Level.row,
        columns = Level.column,
        count = 0;

    removeOldTabel();

    var cards = generateCard(rows*columns);

    var table = document.createElement('table');
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

function removeOldTabel() {
    var oldTabel = document.getElementsByTagName('table');

    if (oldTabel[0]) {
        maingame.removeChild(oldTabel[0]);
    }
}

function generateCard(num) {
    var arr = [],
        data = 1;

    for (let i = 0; i <num; i += 2 ) {
         arr[i] = new Card(data);
         arr[i+1] = new Card(data++)
    }

    return arr.sort(x => Math.random() - 0.5);
}

var targetDivs = [],
    targetId;

var mainGame = function(e){
    var target = e.target,
        data = 0;

    while (target.getAttribute('data') == null) {
        if (target != maingame) {
            target = target.parentNode;
        }
        else return;      
    }
    
    if (target.className.indexOf(' flip') == -1 && target.className.indexOf(' find') == -1 ) {
        data = target.getAttribute('data');
        targetDivs.push(target);
    }
    else return;

    clearTimeout(targetId);
    targetId = setTimeout(clearFlipClass, 2000);

    target.classList.add('flip');

    clearStyle('flip') && target.classList.add('flip');

    findPare();
    winner();
}

function clearStyle(className) {
    var cards = maingame.getElementsByClassName('flip-container'),
        cardsTarget = maingame.getElementsByClassName(className);

    if (cardsTarget.length > 2) {
        [].forEach.call(cards, x => x.classList.remove(className))
        return true;
    }
}

function clearFlipClass() {
    var cards = maingame.getElementsByClassName('flip-container');
    [].forEach.call(cards, x => x.classList.remove('flip'));
    targetDivs = []
}

function findPare() {
    if (targetDivs.length == 2 && targetDivs[0].getAttribute('data') == targetDivs[1].getAttribute('data')) {
        targetDivs[0].classList.add('find');
        targetDivs[1].classList.add('find');
        targetDivs=[];
    }
    else if (targetDivs.length == 2) {
        targetDivs=[];
    }
}

function winner() {
    var findedPars = document.getElementsByClassName('find'),
        allElem = document.getElementsByClassName('flip-container');
        
    if (findedPars.length == allElem.length - 2) {
        [].forEach.call(allElem, x => x.classList.add('flip','find'));
        popup.classList.remove('hidden');
        timer.stopTimer();
        winnertime.innerHTML = timerDiv.innerHTML;
    }
}

maingame.addEventListener('click', mainGame);
startGameFromWin.addEventListener('click', startGame);
start.addEventListener('click', startGame);