var cpuHand = [];
var cpuScore = 0;
var playerScore = 0;
var playerFinalScore = 0;
var playerHand = [];
var playerHandScore = [];
var myOutputValue = "";
var cashPool = loadCashPool();
console.log(cashPool);
var playerBet = 0;
var gameOutcome = " ";

var betMode = "Select your bet";
var playerDeal = "Player's turn to draw cards";
var playerDraw = "Player decision to draw";
var cpuTurn = "CPU's turn to draw cards";
var gameMode = betMode;
var holdButton = document.getElementById("hold-button");
var hitButton = document.getElementById("hit-button");
var updateButton = document.getElementById("update-button");

var button = document.getElementById("submit-button");

var calculateHandScore = function (array) {
  //we assume that array is an array of cards
  var arrayScore = 0;
  var hasAce = false; // assume that the array has no Ace

  for (i = 0; i < array.length; i += 1) {
    arrayScore = arrayScore + Number(array[i]);
    if (array[i] == "1") {
      hasAce = true;
      if ((hasAce = true && array.length < 3 && arrayScore + 10 <= 21)) {
        // if array score +10 is less that 21, then maybe you can use Ace as 11, rather than 1
        arrayScore = arrayScore + 10;
      }
    }
  }

  return arrayScore;
};
var main = function (input) {
  document.getElementById("input-field").disabled = false;
  hitButton.disabled = true;
  holdButton.disabled = true;
  if (gameMode == betMode) {
    playerScore = 0;
    playerHand = [];
    playerHandScore = [];
    if (!input) {
      //validate input
      button.textContent = "What's your bet?";
      return "Invalid input, please key in your bet amount";
    } else playerBet = Number(input);

    var prizeRemaining = cashPool - playerBet;
    gameMode = playerDeal;
    button.textContent = "Deal 'em!";
    return (
      "Let's start the game with your bet of $" +
      playerBet +
      "!!" +
      "<br><br> You have $" +
      prizeRemaining +
      " left!"
    );
  }

  //Player turn to start
  if (gameMode === playerDeal) {
    button.disabled = true;
    hitButton.disabled = false;
    document.getElementById("input-field").disabled = true;
    // Player draws 2 cards
    for (let counter = 0; counter <= 2; counter += 1) {
      var playerCard = shuffledDeck.pop();

      //push into playerhand array
      playerHand.push(playerCard.name + playerCard.suit);
      playerHandScore.push("" + playerCard.value);
      counter = counter + 1;
    }

    var playerScore = calculateHandScore(playerHandScore);

    playerFinalScore = playerScore;
    if (playerFinalScore == 21 && playerHand.length == 2) {
      myOutputValue =
        "Black Jack!<br> You drew " +
        playerHand +
        ". You win $" +
        playerBet * 2 +
        "!<br> Hit 'Submit' to start a new game!";
      document.getElementById("input-field").disabled = false;
      cashPool = cashPool + playerBet * 2;
      gameMode == betMode;
      button.disabled = false;
      button.textContent = "Submit";
      playerScore = 0;
      playerHand = [];
      playerHandScore = [];
      playerBet = "";
      return myOutputValue;
    }
    holdButton.disabled = false;
    hitButton.disabled = false;
    gameMode === betMode;
  }

  var myOutputValue =
    "Your last drawn cards is " +
    playerCard.name +
    playerCard.suit +
    "!<br> Your Hand is " +
    playerHand +
    ". <br> Your score is " +
    playerFinalScore +
    "<br> Select 'Hit' if you want to draw a card";
  button.textContent = "Hit or Hold";

  return myOutputValue;
};

// trigger hit function on hit button
var drawCard = function () {
  var playerCard = shuffledDeck.pop();
  //push into playerhand array
  playerHand.push(playerCard.name + playerCard.suit);
  playerHandScore.push("" + playerCard.value);
  playerFinalScore = calculateHandScore(playerHandScore);
  if (playerFinalScore >= 21) {
    hitButton.disabled = true;
  }

  var myOutputValue =
    "You drew a " +
    playerCard.name +
    playerCard.suit +
    "! Your current hand is " +
    playerHand +
    "! " +
    "! <br>Your current score is " +
    playerFinalScore +
    ".";
  return myOutputValue + gameOutcome;
};

var cpuDraw = function () {
  cpuHand = [];
  cpuScore = 0;
  gameMode = cpuTurn;
  hitButton.disabled = true;
  holdButton.disabled = true;
  for (let counter = 0; counter <= 2; counter += 1) {
    var cpuCard = shuffledDeck.pop();
    if (cpuCard.name == "Ace" && cpuHand.length <= 2) {
      cpuCard.value = 11;
    }
    cpuScore = cpuScore + cpuCard.value;
    // push card into CPU hand array
    cpuHand.push(cpuCard.name + cpuCard.suit);
    counter = counter + 1;
  }

  if (cpuScore == 21 && cpuHand.length == 2) {
    cashPool = cashPool - 2 * playerBet;
    gameMode = betMode;
    gameOutcome =
      "You ended your turn with " +
      playerHand +
      "<br> It is now the Dealer's turn!<br><br> BLACK JACK!! Dealer wins!<br> You lost $" +
      2 * playerBet +
      "!";
    button.disabled = false;
    button.textContent = "Submit new bet";
    return gameOutcome;
  }
  while (cpuScore < 17) {
    cpuCard = shuffledDeck.pop();
    cpuScore = cpuScore + cpuCard.value;
    cpuHand.push(cpuCard.name + cpuCard.suit);
  }
  var myOutputValue =
    "Player Hand is " +
    playerHand +
    ". Player score is " +
    playerFinalScore +
    "<br> Computer drew a hand of " +
    cpuHand +
    " with a score of " +
    cpuScore +
    ". ";
  hitButton.disabled = true;

  var gameOutcome = "";

  if (cpuScore > 21 && playerFinalScore <= 21) {
    cashPool = cashPool + playerBet;
    gameMode = betMode;
    gameOutcome =
      "Dealer has gone over 21, Player wins! <br> You win $" +
      playerBet +
      ". Your current cash pool is : $" +
      cashPool;
  }

  if (cpuScore <= 21 && playerFinalScore > 21) {
    cashPool = cashPool - playerBet;
    gameMode = betMode;
    gameOutcome =
      "<br>Your score is over 21! You lose $" +
      playerBet +
      "!<br>Your current cash pool is $" +
      cashPool;
  }
  if (cpuScore > 21 && playerFinalScore > 21) {
    cashPool = cashPool;
    gameMode = betMode;
    gameOutcome =
      "Both Player and Dealer has busted 21! It is a tie!<br> Your current cash pool is $" +
      cashPool;
  }
  if (cpuScore <= 21 && playerFinalScore <= 21 && cpuScore > playerFinalScore) {
    cashPool = cashPool - playerBet;
    gameMode = betMode;
    gameOutcome =
      "Dealer has won!<br>You lost $ " +
      playerBet +
      "! Your current cash pool is $" +
      cashPool;
  }
  if (cpuScore <= 21 && playerFinalScore <= 21 && cpuScore < playerFinalScore) {
    cashPool = cashPool + playerBet;
    gameMode = betMode;
    gameOutcome =
      "Player has won!<br> Your current cash pool is $" +
      cashPool +
      ". You won $" +
      playerBet +
      "!";
  } else if (
    cpuScore <= 21 &&
    playerFinalScore <= 21 &&
    cpuScore == playerFinalScore
  ) {
    cashPool = cashPool;
    gameMode = betMode;
    gameOutcome = "It's a Tie!<br> Your current cash pool is $" + cashPool;
  }
  button.disabled = false;
  button.textContent = "Submit a new bet?";

  return myOutputValue + gameOutcome;
};
// generate outcome of the results
