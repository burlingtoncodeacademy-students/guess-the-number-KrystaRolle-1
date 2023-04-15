const { get } = require("https");
const { resolve } = require("path");
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
let totalGuesses = 0;

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

const tryGuess = (min, max) => {
  if (totalGuesses === 0) {
    return 50;
  } else {
    return Math.floor(max + (min - max) / 2);
  }
};

start();

async function start() {
  
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log(`You entered ${secretNumber}`);

  let max = 100;
  let min = 1;
  while (totalGuesses < 7) {
    let guess = tryGuess(min, max);
    //const newGuess = getGuessNum(min, max)
    console.log(`Is your number ${Math.floor(guess)}?`);
    let response = await ask(
      `Is my guess correct (Y)? Or is your secret number higher (H) or lower (L)?`
    );
    if (response === "Y") {
      console.log(
        `Your secret number is ${secretNumber}!`
      );     
        process.exit();
    } else if (response === "H") {
      min = guess + 1;
      // console.log(
      //   "Changing the minimum to: " + min + "_" + max + "and middle to " + guess
      // );
      totalGuesses++;
      console.log(totalGuesses);
    } else if (response === "L") {
      max = guess - 1;
      totalGuesses++;
      console.log(totalGuesses);
      // console.log(
      //   "Changing the minimum to: " + min + "_" + max + "and guess to " + guess
      // );
    } else {
      return console.log("Please return valid response, start over");
    }
  }
  console.log(`I'm out of guesses. You win!`);
}

