const times = 1000;
const tries = 10;
// ==> flash screan
let btnStart = document.querySelector(".start_game > button");
let name = document.querySelector(".name span");
let wrong = document.querySelector(".tries span");

// start game
getStart("click",btnStart,name);


// ==> card
let cards = document.querySelectorAll(".box");

// shuffle card
shuffle(cards);

// add class flip to card
flip(cards);

/* 
    #################################################################################
    ################################### Function ####################################
    #################################################################################
*/

// flash screan
function getStart(action,btn,name) {
    btn.addEventListener(action, () => {
        let msg = prompt("Enter Your Name..?");
        (msg == null || msg == "") ? name.innerHTML = "UnKnown" :  name.innerHTML = msg;
        btn.parentElement.style.display = "none";
    })
}

// shuffle card by order
function shuffle(array) {
    array.forEach((card) => {
        let radnNum = Math.round(Math.random() * 19);
        card.style.order = radnNum;
    })
}


// flip card on click
function flip(array) {
    array.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.add("flip");
            // check smaller card and next
            check();

            // end games with wins
            endGames();
        })
    })
}


// check two cards is samller or not samller
function check() {
    
    let totalFlip = document.querySelectorAll(".flip");
    if (totalFlip.length == 2) {
        let memoryGames = document.querySelector(".memory_games");

        // disabled pointer events on page
        memoryGames.style = "pointer-events: none";
        if (totalFlip[0].dataset.technology == totalFlip[1].dataset.technology) {
            totalFlip[0].classList.add("correct");
            totalFlip[1].classList.add("correct");

            // remove flip class from cards correct
            totalFlip[0].classList.remove("flip");
            totalFlip[1].classList.remove("flip");
            memoryGames.style = "";
        }else {
            if (parseInt(wrong.innerHTML) == tries - 1) {
                let allCorrect = document.querySelectorAll(".correct");
                if (allCorrect.length > 0) {
                    allCorrect.forEach((cort) => {
                        cort.classList.remove("correct");
                    })
                    btnStart.parentElement.style.display = "flex";
                    wrong.innerHTML = 0;
                    name.innerHTML = "";
                }else {
                    btnStart.parentElement.style.display = "flex";
                    wrong.innerHTML = 0;
                    name.innerHTML = "";
                }
            }else {
                wrong.innerHTML = parseInt(wrong.innerHTML) + 1;
            }
            // remove flip class from cards
            removeAllFlip(cards);
        }
    }
}


// remove All Flip Class From cards
function removeAllFlip(array) {
    let memoryGames = document.querySelector(".memory_games");
    setTimeout(() => {
        array.forEach((card) => {
            card.classList.remove("flip");
        })
        memoryGames.style = "";
    }, times);
}


// end games wins in games
function endGames() {
    let allCorrectIn = document.querySelectorAll(".correct");

    if (cards.length == allCorrectIn.length) {
        btnStart.parentElement.style.display = "flex";

        allCorrectIn.forEach((cor) => {
            cor.classList.remove("correct");
        })
        
        wrong.innerHTML = 0;
        name.innerHTML  = "";

    }
}