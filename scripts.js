const cards = document.querySelectorAll('.memory-card');

let hasflipped = false;
let lockboard = false;
let firstcard,secondcard;
function flipcard(){
    if(lockboard) return;
    if(this===firstcard) return;
    this.classList.add('flip');

    if(!hasflipped) {
        //first click
        hasflipped = true;
        firstcard = this;
        return;
    } else {
        hasflipped = false;
        secondcard = this; 

        checkForMatch();
    }
}

function checkForMatch() {
    //do cards match
        if(firstcard.dataset.framework === secondcard.dataset.framework) {
           disableCards();
        } else{
            unflipCards();
        }
}

function disableCards() {
     //its a match
            firstcard.removeEventListener('click', flipcard);
            secondcard.removeEventListener('click', flipcard);
            resetBoard();
}

function unflipCards() {

    lockboard = true;
    setTimeout(() => {
            firstcard.classList.remove('flip');
            secondcard.classList.remove('flip');
            resetBoard();
            }, 400);
           
}


function resetBoard() {
    [hasflipped,lockboard] = [false,false];
    [firstcard,secondcard] = [null,null];
}

(function shuffle() {
    cards.forEach(card =>{

        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    })

})();


cards.forEach(card => card.addEventListener('click',flipcard));