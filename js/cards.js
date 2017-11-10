export default class Card {
    constructor(data) {
        this.data = data;
    }

    add(data) {
        new Card(data);      
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
        divBack.setAttribute('style', 'background-position: ' + -100*(this.data - 1) + 'px 0');

        place.appendChild(divFlipContainer);
        divFlipContainer.appendChild(divFlipper);
        divFlipper.appendChild(divFront);
        divFlipper.appendChild(divBack);
    }
}