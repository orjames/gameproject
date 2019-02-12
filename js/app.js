var board = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37];
var blockIds = [0,3,7,10,13,17,20,23,27,30,33,37];
var blockValues = [];
var slotIds = [1,2,4,5,6,8,9,11,12,14,15,16,18,19,21,22,24,25,26,28,29,31,32,34,35,36];
var slotValues = [];
var clickCount = 0;
var currentBlock = 0;
var slot1 = 0;
var i = 0;
var j = 0;
var currentValue = 0;
var mainElement;
var headerElement;
var timerBar;
var singleClickElement;
var doubleClickElement;
var scoreElement;
var startScreen0Element;
var startScreen1Element;
var startScreen2Element;
var startScreen3Element;
var startScreen4Element;
var startScreen5Element;
var gameOver = false;
var timeLeft = 80;
var levelCount = 1;
var scoreCount = 0;
var instuctionButtonCount = 0;
var highScoreEl;
var themeMusic;
var moveToSlotSound;
var moveToBlockSound;
var loseSound;
var winSound;

// generates a random number between and including 0 to 1
function randomNumber0Through1() {
    let rand = Math.floor(Math.random() * 2);
    return rand;
}

// generates a random number between and including 0 to 9
function randomNumber0Through9() {
    let rand = Math.floor(Math.random() * 10);
    return rand;
}

// generates a random number between and including -9 to 9
function randomNumberNeg9Through9() {
    let rand = Math.floor(Math.random() * 19) -9;
    return rand;
}

// generates a random number between and including 1 to 2
function randomNumber1Through2() {
    let rand = Math.floor(Math.random() * 2) + 1;
    return rand;
}

// generates a random number between and including 1 to 3
function randomNumber1Through3() {
    let rand = Math.floor(Math.random() * 3) + 1;
    return rand;
}

// generates a random number between and including 1 to 5
function randomNumber1Through5() {
    let rand = Math.floor(Math.random() * 5) + 1;
    return rand;
}

// tests if a value is a block, input is nextLocation the number of spaces away from currrent locatoin you want to test
function isABlock (nextLocation) {
    if (blockIds.indexOf(i + j + nextLocation) > -1) {
        return true;
    } else {
        return false;
    }
}

// makes two correct slots out of two slot spaces, used in generating the board, called from generateBlocks function
function generateTwoCorrectSlotsOfTwo() {
    currentBlock = blockValues[i];
    firstCorrect = randomNumberNeg9Through9(); // generates a random number -9 to 9 and assigns it to firstCorrect slot
    while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) { // else if sum of currentBlock + firstCorrect is not within the legal bounds
        firstCorrect = randomNumberNeg9Through9(); // keep randomly generating a number until the currentBlock + firstCorrect is within valid game rules
    }
    slotValues[j] = firstCorrect; // assign slotValues[j] the firstCorrect value
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j]; // change slotValues[j] on screen text to that firstCorrect value
    j++; // increment j so it moves on to the next slot value
    secondCorrect = randomNumberNeg9Through9();
    while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
        secondCorrect = randomNumberNeg9Through9();
    }
    slotValues[j] = secondCorrect;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    nextBlock = currentBlock + firstCorrect + secondCorrect;
}

// makes one correct slots out of two slot spaces, used in generating the board, called from generateBlocks function
function generateOneCorrectSlotOfTwo() {
    currentBlock = blockValues[i];

    firstOrSecondSlot = randomNumber0Through1();
    if (firstOrSecondSlot === 0) {
        firstCorrect = randomNumberNeg9Through9();
        while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        nextBlock = currentBlock + firstCorrect;
        incorrectSlotValue1 = randomNumberNeg9Through9();
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else if (firstOrSecondSlot === 1) {
        firstCorrect = randomNumberNeg9Through9();
        while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
        }
        slotValues[j+1] = firstCorrect;
        document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
        j++;
        nextBlock = currentBlock + firstCorrect;
        incorrectSlotValue1 = randomNumberNeg9Through9();
        slotValues[j-1] = incorrectSlotValue1;
        document.getElementById(slotIds[j-1].toString()).textContent = slotValues[j-1];
        j++;
    }
}

// makes one correct slots out of three slot spaces, used in generating the board, called from generateBlocks function
function generateOneCorrectSlotOfThree() {
    currentBlock = blockValues[i];
    incorrectSlotValue1 = randomNumberNeg9Through9();
    slotValues[j] = incorrectSlotValue1;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    firstCorrect = randomNumberNeg9Through9();
    while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
        firstCorrect = randomNumberNeg9Through9();
    }
    slotValues[j] = firstCorrect;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    nextBlock = currentBlock + firstCorrect;
    incorrectSlotValue2 = randomNumberNeg9Through9();
    slotValues[j] = incorrectSlotValue2;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
}

// makes two correct slots out of three slot spaces, used in generating the board, called from generateBlocks function
function generateTwoCorrectSlotsOfThree() {
    currentBlock = blockValues[i];
    routeNumberOutofThree = randomNumber1Through3();
    incorrectSlotValue1 = randomNumberNeg9Through9();
    if (routeNumberOutofThree === 1) {
        firstCorrect = randomNumberNeg9Through9();
        while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        secondCorrect = randomNumberNeg9Through9();
        while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
            secondCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        nextBlock = currentBlock + firstCorrect +secondCorrect;
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else if (routeNumberOutofThree === 2) {
        firstCorrect = randomNumberNeg9Through9();
        while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        secondCorrect = randomNumberNeg9Through9();
        while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
            secondCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        nextBlock = currentBlock + firstCorrect +secondCorrect;
    } else if (routeNumberOutofThree === 3) {
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        secondCorrect = randomNumberNeg9Through9();
        firstCorrect = randomNumberNeg9Through9();
        while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
            secondCorrect = randomNumberNeg9Through9();
        }
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        nextBlock = currentBlock + firstCorrect +secondCorrect;
    }
}

// makes three correct slots out of three slot spaces, used in generating the board, called from generateBlocks function
function generateThreeCorrectSlotsOfThree() {
    currentBlock = blockValues[i];
    firstCorrect = randomNumberNeg9Through9();
    while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
        firstCorrect = randomNumberNeg9Through9();
    }
    slotValues[j] = firstCorrect;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    secondCorrect = randomNumberNeg9Through9();
    while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
        secondCorrect = randomNumberNeg9Through9();
    }
    slotValues[j] = secondCorrect;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    thirdCorrect = randomNumberNeg9Through9();
    while ((currentBlock+firstCorrect+secondCorrect+thirdCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect+thirdCorrect) > 9) {
        thirdCorrect = randomNumberNeg9Through9();
    }
    slotValues[j] = thirdCorrect;
    document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
    j++;
    nextBlock = currentBlock + firstCorrect + secondCorrect + thirdCorrect;
}

// this generates the entie game board, starting at i = 0 and going through each of the blocks in the blockId array
// calls functions to generate 'paths' to reach each block.
// first look looks if the next block is two slots away, then randomly picks if one or two correct slots will be generated
// then looks if the block is three slots away, then randomly picks which of five routes it will randomly generate
function generateBlocks() {
    while (i < blockIds.length - 1) {
        if (isABlock(3)) { // checks if the next block is 3 clicks away
            if (randomNumber1Through2() > 1) { // if two correct slots will be picked
                generateTwoCorrectSlotsOfTwo();
            } else { // one correct slot will be picked
                generateOneCorrectSlotOfTwo();
            }
        }
        else if (isABlock(4)) { // checks if the next block is 4 clicks away
            let routeNumberOutOfFive = randomNumber1Through5(); // generates random number 1-5 to be used in following if statements
            if (routeNumberOutOfFive === 1) { // one correct slot will be picked
                generateOneCorrectSlotOfThree();
            }
            else if (routeNumberOutOfFive > 1 && routeNumberOutOfFive < 5 ) { // two correct slots will be made
                generateTwoCorrectSlotsOfThree();
            }
            else { // three correct slots will be made
                generateThreeCorrectSlotsOfThree();
            }
        }
        i++;
        currentBlock = nextBlock;
        blockValues[i] = currentBlock;
        document.getElementById(blockIds[i].toString()).textContent = blockValues[i];
    }
}

// initializes the entire game, first parent fucntion of all others.
function initialize() {
    slotValues = [];
    clickCount = 0;
    currentBlock = 0;
    slot1 = 0;
    i = 0;
    j = 0;
    currentValue = 0;
    gameOver = false;
    blockValues[i] = randomNumber0Through9();
    currentBlock = blockValues[i];
    document.getElementById(blockIds[i].toString()).textContent = blockValues[i];
    document.getElementById(clickCount.toString()).className = 'selectedBlock';
    setTimeout(colorBackground, 10);
    generateBlocks();
    colorTextOfSlots();
    currentValue = blockValues[0];
    themeMusic.play();
}

// initializes the next level after user has won previous level
function initializeNextLevel () {
    headerElement.style.color = 'rgba(77,182,172,1)';
    timerBar.style.display = 'flex';
    nextLevelButton.style.display = 'none';
    singleClickElement.style.display = 'flex';
    doubleClickElement.style.display = 'flex';
    document.getElementById(clickCount.toString()).className = 'block';
    mainElement.style.transition = 'background-color 140s';
    headerElement.textContent = 'intejump';
    startTimer();
    initialize();
}

// starts the gradual transition of the background from near-white to reddish as the level starts
function colorBackground() {
    mainElement.style.backgroundColor = 'rgba(183, 28, 28, 0.8)';
}

// colors the text of each slot based on if its negative(red) or positive(green)
function colorTextOfSlots() {
    let currentIndex = 0;
    for (var value of slotValues) {
        if (value > 0) { // if its a positive number
            document.getElementById(slotIds[currentIndex].toString()).className = 'positiveSlot';
            currentIndex++;
        } else if (value < 0) {
            document.getElementById(slotIds[currentIndex].toString()).className = 'negativeSlot';
            currentIndex++;
        } else {
            currentIndex++;
        }
    }
}

function startTimer() {
    setTimer = setInterval(timerFunction, 100);
}

function timerFunction () {
    timerBar.max = (80 - (levelCount-1)*10);
    timerBar.value = (80 - (levelCount-1)*10) - timeLeft;
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
        updateYouLost();
        clearInterval(setTimer);
    } if (gameOver) {
        clearInterval(setTimer);
    }
}

// starts the game makes sure none of the instructions screens are showing, activates the divs that control click/double click
function startGame() {
    startScreen0.style.display = 'none';
    startScreen1.style.display = 'none';
    startScreen2.style.display = 'none';
    startScreen3.style.display = 'none';
    startScreen4.style.display = 'none';
    startScreen5.style.display = 'none';
    singleClickElement.style.display = 'flex';
    doubleClickElement.style.display = 'flex';
    initialize();
    startTimer();
}

// in the instructions screen, hides every div that isn't the current instruction
function moveToNextInstruction() {
    document.getElementById(`startScreen${instuctionButtonCount}`).style.display = 'none';
    instuctionButtonCount++;
    document.getElementById(`startScreen${instuctionButtonCount}`).style.display = 'flex';
}

// page loaded assigning variables to each block/slot on the board to change it as the game progresses
// assigning the currentValue to the starting block value
// adding event listeners for single and double clicks
document.addEventListener('DOMContentLoaded', function() {
    mainElement = document.querySelector('main');
    headerElement = document.querySelector('header');
    timerBar = document.getElementById('timerBar');
    singleClickElement = document.getElementById('singleClick');
    doubleClickElement = document.getElementById('doubleClick');
    nextLevelButton = document.getElementById('nextLevelButton');
    scoreElement = document.getElementById('score');
    startScreen0Element = document.getElementById('startScreen0');
    startScreen1Element = document.getElementById('startScreen1');
    startScreen2Element = document.getElementById('startScreen2');
    startScreen3Element = document.getElementById('startScreen3');
    startScreen4Element = document.getElementById('startScreen4');
    startScreen5Element = document.getElementById('startScreen5');
    themeMusic = document.getElementById('themeMusic');
    moveToSlotSound = document.getElementById('moveToSlotSound');
    moveToBlockSound = document.getElementById('moveToBlockSound');
    loseSound = document.getElementById('loseSound');
    winSound = document.getElementById('winSound');
    singleClickElement.addEventListener('click', singleClick);
    doubleClickElement.addEventListener('click', doubleClick);
    nextLevelButton.addEventListener('click', initializeNextLevel);
    document.getElementById('skipStartButton').addEventListener('click', startGame);
    document.getElementById('zeroStartButton').addEventListener('click', moveToNextInstruction);
    document.getElementById('firstStartButton').addEventListener('click', moveToNextInstruction);
    document.getElementById('secondStartButton').addEventListener('click', moveToNextInstruction);
    document.getElementById('thirdStartButton').addEventListener('click', moveToNextInstruction);
    document.getElementById('fourthStartButton').addEventListener('click', moveToNextInstruction);
    document.getElementById('fifthStartButton').addEventListener('click', startGame);

    highScoreEl = document.getElementById('highScore');
    if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', 0);
    } else {
        highScoreEl.textContent = localStorage.getItem('highScore');
    }
    initialize();
});

// updates all the DOM content to show you lost, resets the timer, resets levelCount, scoreCount, timeLeft etc.
function updateYouLost() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'losingSlot';
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) {  // you're on a block
        document.getElementById(clickCount.toString()).className = 'losingBlock';
    }
    loseSound.play();
    gameOver = true;
    levelCount = 1;
    scoreCount = 0;
    timeLeft = 80;
    headerElement.textContent = 'you lost';
    headerElement.style.color = 'rgba(239,83,80,0.9)';
    scoreElement.textContent = `${scoreCount}`; 
    clearInterval(setTimer);
    timerBar.style.display = 'none';
    nextLevelButton.style.display = 'flex';
    nextLevelButton.textContent = `restart?`;
    singleClickElement.style.display = 'none';
    doubleClickElement.style.display = 'none';
    mainElement.style.transition = 'auto';
    mainElement.style.backgroundColor = 'rgba(237, 240, 241, 0.9)';
}

// updates all the DOM content to show you won, resets the timer, reduces the next levels timer, increases levelCount
function updateYouWon() {
    gameOver = true;
    headerElement.textContent = 'you won';
    headerElement.style.color = 'rgba(139,195,74,0.9)';
    levelCount++;
    clearInterval(setTimer);
    timeLeft = 80 - ((levelCount-1)*10);
    timerBar.style.display = 'none';
    nextLevelButton.style.display = 'flex';
    nextLevelButton.textContent = `to level ${levelCount}?`;
    singleClickElement.style.display = 'none';
    doubleClickElement.style.display = 'none';
    mainElement.style.transition = 'auto';
    mainElement.style.backgroundColor = 'rgba(181, 187, 189, 0.9)';
    winSound.play();
}

// checks if you lost using the three board parameters and then checks if you've won, done after every click
function checkIfLost() {
    if (currentValue > 9) {
        updateYouLost();
    } else if (currentValue < -9 ) {
        updateYouLost();
    } else if ( (blockIds.indexOf(board[clickCount]) > -1) && (currentValue != blockValues[blockIds.indexOf(clickCount)])) {
        updateYouLost();
    } else if ( ( slotIds.indexOf(board[clickCount]) > -1 ) && ( blockIds.indexOf(board[clickCount-1]) > -1 ) ) { // you're in a slot and the previous space is a block
        if ( (currentValue -  slotValues[slotIds.indexOf(clickCount)]) !=  blockValues[blockIds.indexOf(clickCount-1)] ) {       
            updateYouLost();
        }
    } else if ((board.length - 1) === clickCount) {
        updateYouWon();
    }
}

// updates the DOM content of the space you were just on to clear its formatting and remove the value from it
function emptyPreviouslyActiveSpace() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'slot';
        document.getElementById(clickCount.toString()).textContent = '';
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
        document.getElementById(clickCount.toString()).className = 'block';
        document.getElementById(clickCount.toString()).textContent = '';
    }
}

// files the now active space that you just jumped into, adds its value to your cumulative, adds score if you reach a block
function fillActiveSpace() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'selectedSlot';
        document.getElementById(clickCount.toString()).textContent = currentValue;
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) {  // you're on a block
        scoreCount++; // your score has increased
        if (scoreCount > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', scoreCount);
        }
        scoreElement.textContent = `${scoreCount}`; // show your score on the game
        document.getElementById(clickCount.toString()).className = 'selectedBlock';
        document.getElementById(clickCount.toString()).textContent = currentValue;
    }
}

// registers a single jump click event, triggers the functions to update DOM, checks if you've lost
function singleClick() {
    if (!gameOver) {
        emptyPreviouslyActiveSpace();
        clickCount++;
        if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
            currentValue = currentValue + slotValues[slotIds.indexOf(clickCount)];
            fillActiveSpace();
            checkIfLost();
            moveToSlotSound.play();
        } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
            fillActiveSpace();
            checkIfLost();
            if (!gameOver) {
                moveToBlockSound.play();
            }
        }
    }
}

// registers a double jump click event, triggers the functions to update DOM, checks if you've lost
function doubleClick() {
    if (!gameOver) {
        emptyPreviouslyActiveSpace();
        clickCount += 2;
        if (clickCount > 37) {
            clickCount = 37;
            checkIfLost();
        }
        if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
            currentValue = currentValue + slotValues[slotIds.indexOf(clickCount)];
            fillActiveSpace();
            checkIfLost();
            moveToSlotSound.play();
        } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
            fillActiveSpace();
            checkIfLost();
            if (!gameOver) {
                moveToBlockSound.play();
            }
        }
    }
}