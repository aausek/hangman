// GLOBAL VARIABLES
// ================
// Arrays & storage variables
var wordsOptions = ["gameofthrones", "ozark", "houseofcards", "blackmirror", "orphanblack", "sense8", "strangerthings"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = []; // o _ _ _ _ 
var wrongLetters = [];

// Game counter
var winCount = 0;
var lossCount = 0;
var guessesRem = 9;

// FUNCTIONS
// =========
function startGame() {
    selectedWord = wordsOptions[Math.floor(Math.random() * wordsOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    // Reset counter
    guessesRem = 9;
    blanksAndSuccesses = [];
    wrongLetters = [];

    // Populate blanks & successes with the right number of spaces
    for (var i = 0; i< numBlanks; i++) {
      blanksAndSuccesses.push(" _ ");
    }

    // Update HTML with round conditions
    $("#wordToGuess").html(blanksAndSuccesses);
        wordToGuess = blanksAndSuccesses.join(" ");
    $("#numGuesses").html(guessesRem);
    $("#winCounter").html(winCount);
    $("#lossCounter").html(lossCount);

    // Testing 
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
    console.log(wordToGuess);
}

// Check guessed-letter placement in word
function letterCheck(letter) {
  // Check if letter exists in code 

  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }

  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }

  else {
    wrongLetters.push(letter);
    guessesRem--;
  }
  // Testing
  console.log(blanksAndSuccesses);
}

function gameOver() {
  console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesRem);

  // Change HTML counters
  $("#numGuesses").html(guessesRem);
  $("#wordToGuess").html(blanksAndSuccesses.join(" ").toString());
  $("#letGuesses").html(" " + wrongLetters.join(" ").toUpperCase());

  // Check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("WHOOP! YOU WON");

    // Update the counter
    $("#winCounter").html(winCount);
    startGame();
  }

  // Check if user lost
  else if (guessesRem == 0) {
    lossCount++;
    alert("Boooo! Loser");

    // Update loss counter
    $("#lossCounter").html(lossCount);
    startGame();
  } 
}

// MAIN PROCESS
// ============

// Initiate the code function for the first time
startGame();

// Register key clicks
$(function(){
  $(document).on("keypress", function(e){
    var letGuesses = String.fromCharCode(e.keyCode);
    letterCheck(letGuesses);
    gameOver();

    // Testing
    console.log(letGuesses);
  });
});


