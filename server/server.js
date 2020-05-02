const express = require("express");
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require("./routes")(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false,
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

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

// if (players === 2) {
//   splitCards2();
// } else if (players === 4) {
//   splitCards4();
// }

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});

module.exports = app;
