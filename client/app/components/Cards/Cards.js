//javascript functions for card games:

// Declaring numbers array:
var num = [
  { value: 1, name: "2" },
  { value: 2, name: "3" },
  { value: 3, name: "4" },
  { value: 4, name: "5" },
  { value: 5, name: "6" },
  { value: 6, name: "7" },
  { value: 7, name: "8" },
  { value: 8, name: "9" },
  { value: 9, name: "10" },
  { value: 10, name: "J" },
  { value: 11, name: "Q" },
  { value: 12, name: "K" },
  { value: 13, name: "A" },
];

//Declaring shapes:

var shapes = ["spade", "clover", "heart", "diamond"];

//Declaring empty Deck:

var deck = [];

//Function for creating a Deck:

function createDeck() {
  for (i = 0; i < shapes.length; i++) {
    for (j = 0; j < num.length; j++) {
      var cards = { value: num[j], shape: shapes[i] };
      deck.push(cards);
    }
  }
  return deck;
}

//Function for shuffling the Deck:

function shuffleDeck() {
  // for 1000 turns
  // switch the values of two random cards
  for (var i = 0; i < 1000; i++) {
    var location1 = Math.floor(Math.random() * deck.length);
    var location2 = Math.floor(Math.random() * deck.length);
    var tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

//Function to split the cards and for two players:

function splitCards2() {
  let deckCopy = [...deck];
  var equal = deckCopy.length / 2;
  let player1Cards = deckCopy.splice(0, equal);
  let player2Cards = deckCopy;
}

//Function to split the cards and for four players:

function splitCards4() {
  let deckCopy = [...deck];
  var equal = deckCopy.length / 4;
  let player1Cards = deckCopy.splice(0, equal);
  let player2Cards = deckCopy.splice(0, equal);
  let player3Cards = deckCopy.splice(0, equal);
  let player4Cards = deckCopy;
}

//Calling functions (start):

createDeck();
shuffleDeck();

if (players === 2) {
  splitCards2();
} else if (players === 4) {
  splitCards4();
}

//Create two React components for stating a game and joining it:
