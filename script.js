const gameContainer = document.getElementById("game");
const winDiv = document.querySelector("#winScreen");
let score = document.querySelector("#score");
let blocker = false;
let card1 = null;
let card2 = null;
let pairs = 0;
let count = 0;

const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "lightblue",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "lightblue",
  "purple",
  "pink",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
    // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivs(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'grey';
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  
  if (e.target.classList.contains("flip") || blocker) return;
  console.log(pairs+"");
  let thisCard = e.target;
  thisCard.style.backgroundColor = thisCard.classList[0];

  if(!card1 || !card2){
    thisCard.classList.add("flip");
    card1 = card1 || thisCard;
    card2 = thisCard === card1 ? null : thisCard;
    
    let s = parseInt(score.innerHTML);
    s++;
    score.innerHTML = s;
  }

  if (card1 && card2) {
    blocker = true;
    if (card1.className === card2.className) {
      blocker = false;
      pairs++;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
    } else {
      setTimeout(function() {
        blocker = false;
        card1.classList.remove("flip");
        card2.classList.remove("flip");
        card1.style.backgroundColor = "grey";
        card2.style.backgroundColor = "grey";
        card1 = null;
        card2 = null;
      }, 750);
    }
  }
  if(pairs === 8 ){
    winDiv.style.visibility = 'visible';
    winDiv.innerHTML += `Score: ${parseInt(score.innerHTML)}`;
  }
}
createDivs(shuffledColors);
