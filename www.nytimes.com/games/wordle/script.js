const wordDatabase = ['blitz', 'sweep', 'blade', 'pluck', 'scent', 'globe', 'happy', 'snake', 'forge', 'crane', 'ultra', 'dance', 'yield', 'pluck', 'laser', 'pluck', 'bison', 'swirl', 'twirl', 'sword', 'pluck', 'vivid', 'blade', 'lunar', 'forge', 'moose', 'scold', 'latch', 'quilt', 'plush', 'forge', 'grief', 'quash', 'quart', 'swarm', 'pluck', 'swoon', 'quash', 'forge', 'lunar', 'dwell', 'globe', 'pluck', 'ultra', 'pluck', 'latch', 'quart', 'dance', 'blade', 'pluck', 'vivid', 'quart', 'scold', 'pluck', 'grief', 'wharf', 'laser', 'forge', 'pluck', 'swirl', 'happy', 'pluck', 'vivid', 'laser', 'quash', 'lunar', 'blade', 'quilt', 'grief', 'snake', 'ultra', 'dance', 'globe', 'scent', 'quilt', 'wharf', 'pluck', 'laser', 'grief', 'yield', 'sweep', 'scold', 'twirl', 'quilt', 'globe', 'blade', 'laser', 'plush'];

let currentWord;
let currentAttempt = 0;
let squares;

function startGame() {
    currentWord = getRandomWord();
    currentAttempt = 0;
    displayWordLayers();
    document.getElementById('try-again-btn').style.display = 'none';
    document.getElementById('enter-btn').style.display = 'block';
}

function getRandomWord() {
    return wordDatabase[Math.floor(Math.random() * wordDatabase.length)];
}

function displayWordLayers() {
    const wordLayers = document.getElementById('word-layers');
    wordLayers.innerHTML = '';
    squares = [];

    for (let i = 0; i < 6; i++) {
        squares[i] = [];

        for (let j = 0; j < 5; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `square-${i}-${j}`;
            square.contentEditable = true;
            square.addEventListener('input', handleInput);
            wordLayers.appendChild(square);
            squares[i][j] = square;
        }
    }
}

function handleInput(event) {
    const inputSquare = event.target;

    if (inputSquare.innerText.length > 1) {
        inputSquare.innerText = inputSquare.innerText.slice(0, 1);
    }

    if (!isLetter(inputSquare.innerText)) {
        inputSquare.innerText = '';
    }

    moveFocus(inputSquare);
}

function moveFocus(inputSquare) {
    const index = getIndex(inputSquare);

    if (index.col < 4) {
        squares[index.row][index.col + 1].focus();
    }
}

function getIndex(square) {
    const id = square.id.split('-');
    return { row: parseInt(id[1]), col: parseInt(id[2]) };
}

function isLetter(str) {
    return /^[a-zA-Z]$/.test(str);
}

function checkGuess() {
    let guess = '';

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const square = squares[i][j];
            guess += square.innerText.trim().toUpperCase();
        }
    }

    if (guess.length !== 5) {
        alert("Please enter exactly 5 letters.");
        return;
    }

    for (let i = 0; i < guess.length; i++) {
        const square = squares[currentAttempt][i];

        if (isLetter(guess[i])) {
            square.classList.remove('gray');

            if (guess[i] === currentWord[i]) {
                square.classList.add('green');
            } else if (currentWord.includes(guess[i])) {
                square.classList.add('yellow');
            } else {
                square.classList.add('gray');
            }
        } else {
            square.classList.add('gray');
        }
    }

    if (guess === currentWord) {
        document.getElementById('try-again-btn').style.display = 'block';
        alert(`Congratulations! You guessed the word in ${currentAttempt + 1} attempts.`);
        document.getElementById('enter-btn').style.display = 'none';
    }

    if (currentAttempt >= 5) {
        document.getElementById('try-again-btn').style.display = 'block';
        alert(`Sorry! You've reached the maximum number of attempts. The correct word was '${currentWord}'.`);
        document.getElementById('enter-btn').style.display = 'none';
    }

    currentAttempt++;
}


function tryAgain() {
    startGame();
}

startGame();
