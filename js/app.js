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
var gameOver = false;
var timeLeft = 80;
var levelCount = 1;
var scoreCount = 0;
var instuctionButtonCount = 0;
var highScoreEl;
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

function generateTwoCorrectSlotsOfTwo() {
    console.log('two correct slots will be made');
    currentBlock = blockValues[i]; // TESTIING
    console.table({blockValues});
    firstCorrect = randomNumberNeg9Through9();
    if ((currentBlock + firstCorrect) >= -9 && (currentBlock + firstCorrect) <= 9) {
        console.log('firstCorrect is initally ' + firstCorrect);
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else {
        while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) firstCorrect is ' + firstCorrect);
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    }
    secondCorrect = randomNumberNeg9Through9();
    if ((currentBlock+firstCorrect+secondCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect) <= 9) {
        console.log('secondCorrect is initally ' + secondCorrect);
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else {
        while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
            secondCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) secondCorrect is ' + secondCorrect);
        }
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    }
    nextBlock = currentBlock + firstCorrect + secondCorrect;
    console.log('nextBlock is ' + nextBlock);
}

function generateOneCorrectSlotOfTwo() {
    console.log('one correct slot will be made');
    currentBlock = blockValues[i]; // TESTIING
    console.table({blockValues});
    firstOrSecondSlot = randomNumber0Through1();
    if (firstOrSecondSlot === 0) {
        console.log('one correct, and that correct is first slot');
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock+firstCorrect) >= 0 && (currentBlock+firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            // slotValues[j] = firstCorrect;
            // document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            // j++;
        } else {
            while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            // slotValues[j] = firstCorrect;
            // document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            // j++;
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        nextBlock = currentBlock + firstCorrect;
        console.log('nextBlock is ' + nextBlock);
        incorrectSlotValue1 = randomNumberNeg9Through9();
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else if (firstOrSecondSlot === 1) {
    console.log('one correct, and that correct is second slot');
    firstCorrect = randomNumberNeg9Through9();
    if ((currentBlock+firstCorrect) >= 0 && (currentBlock+firstCorrect) <= 9) {
        console.log('firstCorrect is initally ' + firstCorrect);
        // slotValues[j+1] = firstCorrect;
        // document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
        // j++;
    } else {
        while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) firstCorrect is ' + firstCorrect);
        }
        // slotValues[j+1] = firstCorrect;
        // document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
        // j++;
    }
    slotValues[j+1] = firstCorrect;
    document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
    j++;
    nextBlock = currentBlock + firstCorrect;
    console.log('nextBlock is ' + nextBlock);
    incorrectSlotValue1 = randomNumberNeg9Through9();
    slotValues[j-1] = incorrectSlotValue1;
    document.getElementById(slotIds[j-1].toString()).textContent = slotValues[j-1];
    j++;
    }
}

function generateOneCorrectSlotOfThree() {
    console.log('one correct slot will be made');
        console.log('one correct, and that correct is second slot');
        currentBlock = blockValues[i];
        incorrectSlotValue1 = randomNumberNeg9Through9();
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock+firstCorrect) >= 0 && (currentBlock+firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        } else {
            while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        }
        j++;
        nextBlock = currentBlock + firstCorrect;
        console.log('nextBlock is ' + nextBlock);
        incorrectSlotValue2 = randomNumberNeg9Through9();
        slotValues[j] = incorrectSlotValue2;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
}

function generateTwoCorrectSlotsOfThree() {
    console.log('two correct slots will be made out of three');
    currentBlock = blockValues[i];
    routeNumberOutofThree = randomNumber1Through3();
    incorrectSlotValue1 = randomNumberNeg9Through9();
    if (routeNumberOutofThree === 1) {
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock + firstCorrect) >= -9 && (currentBlock + firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        secondCorrect = randomNumberNeg9Through9();
        if ((currentBlock+firstCorrect+secondCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect) <= 9) {
            console.log('secondCorrect is initally ' + secondCorrect);
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
                secondCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) secondCorrect is ' + secondCorrect);
            }
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        nextBlock = currentBlock + firstCorrect +secondCorrect;
        console.log('nextBlock is ' + nextBlock);
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else if (routeNumberOutofThree === 2) {
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock + firstCorrect) >= -9 && (currentBlock + firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        secondCorrect = randomNumberNeg9Through9();
        if ((currentBlock+firstCorrect+secondCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect) <= 9) {
            console.log('secondCorrect is initally ' + secondCorrect);
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
                secondCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) secondCorrect is ' + secondCorrect);
            }
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        nextBlock = currentBlock + firstCorrect +secondCorrect;
        console.log('nextBlock is ' + nextBlock);
    } else if (routeNumberOutofThree === 3) {

        slotValues[j] = incorrectSlotValue1;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
        secondCorrect = randomNumberNeg9Through9();
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock + firstCorrect) >= -9 && (currentBlock + firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        if ((currentBlock+firstCorrect+secondCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect) <= 9) {
            console.log('secondCorrect is initally ' + secondCorrect);
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
                secondCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) secondCorrect is ' + secondCorrect);
            }
            slotValues[j] = secondCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
        nextBlock = currentBlock + firstCorrect +secondCorrect;
        console.log('nextBlock is ' + nextBlock);
    } else {
        console.log('there is an error in generateTwoCorrectSlotsOfThree');
    }
}

function generateThreeCorrectSlotsOfThree() {
    console.log('three correct slots will be made out of three');
    currentBlock = blockValues[i];
    firstCorrect = randomNumberNeg9Through9();
    if ((currentBlock + firstCorrect) >= -9 && (currentBlock + firstCorrect) <= 9) {
        console.log('firstCorrect is initally ' + firstCorrect);
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else {
        while ((currentBlock + firstCorrect) < -9 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) firstCorrect is ' + firstCorrect);
        }
        slotValues[j] = firstCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    }
    secondCorrect = randomNumberNeg9Through9();
    if ((currentBlock+firstCorrect+secondCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect) <= 9) {
        console.log('secondCorrect is initally ' + secondCorrect);
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else {
        while ((currentBlock+firstCorrect+secondCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect) > 9) {
            secondCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) secondCorrect is ' + secondCorrect);
        }
        slotValues[j] = secondCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    }
    thirdCorrect = randomNumberNeg9Through9();
    if ((currentBlock+firstCorrect+secondCorrect+thirdCorrect) >= 0 && (currentBlock+firstCorrect+secondCorrect+thirdCorrect) <= 9) {
        console.log('thirdCorrect is initally ' + thirdCorrect);
        slotValues[j] = thirdCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    } else {
        while ((currentBlock+firstCorrect+secondCorrect+thirdCorrect) < 0 || (currentBlock+firstCorrect+secondCorrect+thirdCorrect) > 9) {
            thirdCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) thirdCorrect is ' + thirdCorrect);
        }
        slotValues[j] = thirdCorrect;
        document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
        j++;
    }
    nextBlock = currentBlock + firstCorrect + secondCorrect + thirdCorrect;
    console.log('nextBlock is ' + nextBlock);
}

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
}

function initializeNextLevel () {
    document.querySelector('header').style.color = 'rgba(77,182,172,1)';
    document.getElementById('timerBar').style.display = 'flex';
    document.getElementById('nextLevelButton').style.display = 'none';
    document.getElementById('singleClick').style.display = 'flex';
    document.getElementById('doubleClick').style.display = 'flex';
    document.getElementById(clickCount.toString()).className = 'block';
    document.querySelector('main').style.transition = 'background-color 10s';
    document.querySelector('header').textContent = 'intejump';
    startTimer();
    initialize();
}

function colorBackground() {
    // document.querySelector('main').style.backgroundColor = 'rgba(183, 28, 28, 0.8)';
}

function generateBlocks() {
    while (i < blockIds.length - 1) {
        console.log('currentBlock is ' + currentBlock);
        if (isABlock(3)) { // checks if the next block is 3 clicks away
            console.log('next block is two slots away');
            if (randomNumber1Through2() > 1) { // if two correct slots will be picked
                generateTwoCorrectSlotsOfTwo();
                console.log('i is ' + i);
                console.log('j is ' + j);
            } else { // one correct slot will be picked
                generateOneCorrectSlotOfTwo();
                console.log('i is ' + i);
                console.log('j is ' + j);
            }
        }
        else if (isABlock(4)) { // checks if the next block is 4 clicks away
            console.log('block is three slots away');
            let routeNumberOutOfFive = randomNumber1Through5();
            if (routeNumberOutOfFive === 1) { // one correct slot will be picked
                generateOneCorrectSlotOfThree();
            }
            else if (routeNumberOutOfFive > 1 && routeNumberOutOfFive < 5 ) { // two correct slots will be made
                generateTwoCorrectSlotsOfThree();
            }
            else if (routeNumberOutOfFive === 5) { // three correct slots will be made
                generateThreeCorrectSlotsOfThree();
            }
        }
        i++;
        currentBlock = nextBlock;
        blockValues[i] = currentBlock;
        document.getElementById(blockIds[i].toString()).textContent = blockValues[i];
    }
}


// colors the text of each slot based on if its negative(red) or positive(green)
function colorTextOfSlots() {
    console.table({slotValues, slotIds, currentValue, blockValues, blockIds});
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
    document.getElementById('timerBar').max = (80 - (levelCount-1)*5);
    document.getElementById('timerBar').value = (80 - (levelCount-1)*5) - timeLeft;
    timeLeft -= 0.1;
    if(timeLeft <= 0) {
    updateYouLost();
    clearInterval(setTimer);
    } if (gameOver) {
        clearInterval(setTimer);
    }
}

function startGame() {
    initialize();
    startTimer();
    document.getElementById('startScreen0').style.display = 'none';
    document.getElementById('startScreen1').style.display = 'none';
    document.getElementById('startScreen2').style.display = 'none';
    document.getElementById('startScreen3').style.display = 'none';
    document.getElementById('startScreen4').style.display = 'none';
    document.getElementById('startScreen5').style.display = 'none';
    document.getElementById('singleClick').style.display = 'flex';
    document.getElementById('doubleClick').style.display = 'flex';
}

function moveToNextInstruction() {
    instuctionButtonCount++;
    document.getElementById('startScreen0').style.display = 'none';
    document.getElementById('startScreen1').style.display = 'none';
    document.getElementById('startScreen2').style.display = 'none';
    document.getElementById('startScreen3').style.display = 'none';
    document.getElementById('startScreen4').style.display = 'none';
    document.getElementById('startScreen5').style.display = 'none';
    document.getElementById(`startScreen${instuctionButtonCount}`).style.display = 'flex';
}

// page loaded assigning variables to each block/slot on the board to change it as the game progresses
// assigning the currentValue to the starting block value
// adding event listeners for single and double clicks
document.addEventListener('DOMContentLoaded', function() {
    console.log('up and running');
    initialize();
    document.getElementById('singleClick').addEventListener('click', singleClick);
    document.getElementById('doubleClick').addEventListener('click', doubleClick);
    document.getElementById('nextLevelButton').addEventListener('click', initializeNextLevel);
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
    moveToSlotSound = new sound();
    moveToBlockSound = new sound();
    loseSound = new sound();
    winSound = new sound();
});

function updateYouLost() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'losingSlot';
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) {  // you're on a block
        document.getElementById(clickCount.toString()).className = 'losingBlock';
    }
    gameOver = true;
    levelCount = 1;
    scoreCount = 0;
    timeLeft = 80;
    document.querySelector('header').textContent = 'you lost';
    document.querySelector('header').style.color = 'rgba(239,83,80,0.9)';
    document.getElementById('score').textContent = ` ${scoreCount}`; 
    clearInterval(setTimer);
    document.getElementById('timerBar').style.display = 'none';
    document.getElementById('nextLevelButton').style.display = 'flex';
    document.getElementById('nextLevelButton').textContent = `restart?`;
    document.getElementById('singleClick').style.display = 'none';
    document.getElementById('doubleClick').style.display = 'none';
    document.querySelector('main').style.transition = 'auto';
    document.querySelector('main').style.backgroundColor = 'rgba(181, 187, 189, 0.9)';
}

function updateYouWon() {
    gameOver = true;
    document.querySelector('header').textContent = 'you won';
    document.querySelector('header').style.color = 'rgba(139,195,74,0.9)';
    levelCount++;
    clearInterval(setTimer);
    timeLeft = 80 - ((levelCount-1)*5);
    document.getElementById('timerBar').style.display = 'none';
    document.getElementById('nextLevelButton').style.display = 'flex';
    document.getElementById('nextLevelButton').textContent = `to level ${levelCount}?`;
    document.getElementById('singleClick').style.display = 'none';
    document.getElementById('doubleClick').style.display = 'none';
    document.querySelector('main').style.transition = 'auto';
    document.querySelector('main').style.backgroundColor = 'rgba(181, 187, 189, 0.9)';
}

function checkIfLost() {
    if (currentValue > 9) {
        console.log('exceeded 9 in positive double digits, lost');
        updateYouLost();
    } else if (currentValue < -9 ) {
        console.log('less than negative 9, exceeded double digits, lost');
        updateYouLost();
    } else if ( (blockIds.indexOf(board[clickCount]) > -1) && (currentValue != blockValues[blockIds.indexOf(clickCount)])) {
        console.log('currrent block value is ', blockValues[blockIds.indexOf(clickCount)]);
        console.log('current value doesnt match block value, you must match on blocks');
        updateYouLost();
    } else if ( ( slotIds.indexOf(board[clickCount]) > -1 ) && ( blockIds.indexOf(board[clickCount-1]) > -1 ) ) { // you're in a slot and the previous space is a block
        console.log('knows youre in a slot after a block');
        console.log('it thinks current value is ', currentValue);
        console.log('it thinks the slot value is ', slotValues[slotIds.indexOf(clickCount)]);
        console.log('it thinks current value minus slot value is (this should be previous block value ', (currentValue -  slotValues[slotIds.indexOf(clickCount)]));
        console.log('it thinks the previous block value is ', blockValues[blockIds.indexOf(clickCount-1)]);
        if ( (currentValue -  slotValues[slotIds.indexOf(clickCount)]) !=  blockValues[blockIds.indexOf(clickCount-1)] ) {       
            console.log('you skipped over a block, lost');
            updateYouLost();
        }
    } if ((board.length - 1) === clickCount) {
        console.log('you won');
        updateYouWon();
    }
}

function emptyPreviouslyActiveSpace() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'slot';
        document.getElementById(clickCount.toString()).textContent = '';
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
        document.getElementById(clickCount.toString()).className = 'block';
        document.getElementById(clickCount.toString()).textContent = '';
    }
}

function fillActiveSpace() {
    if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
        document.getElementById(clickCount.toString()).className = 'selectedSlot';
        document.getElementById(clickCount.toString()).textContent = currentValue;
    } else if ( blockIds.indexOf(board[clickCount]) > -1 ) {  // you're on a block
        scoreCount++; // your score has increased
        if (scoreCount > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', scoreCount);
        }
        document.getElementById('score').textContent = ` ${scoreCount}`; // show your score on the game
        document.getElementById(clickCount.toString()).className = 'selectedBlock';
        document.getElementById(clickCount.toString()).textContent = currentValue;
    }
}

function singleClick() {
    if (!gameOver) {
        emptyPreviouslyActiveSpace();
        clickCount++;
        console.log('registered single click, count is ' + clickCount);
        if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
            currentValue = currentValue + slotValues[slotIds.indexOf(clickCount)];
            console.log('in single click, slots, currentValue is', currentValue);
            fillActiveSpace();
            checkIfLost();
        } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
            console.log('in single click, blocks, currentValue is', currentValue);
            fillActiveSpace();
            checkIfLost();
        } else {
            console.log("error");
        }
    } else {
        console.log('game is over, cant click');
    }
}

function doubleClick() {
    if (!gameOver) {
        emptyPreviouslyActiveSpace();
        clickCount += 2;
        console.log('registered double click, count is '+ clickCount);
        if (clickCount > 37) {
            clickCount = 37;
            checkIfLost();
        }
        if ( slotIds.indexOf(board[clickCount]) > -1 ) { //you're in a slot;
            currentValue = currentValue + slotValues[slotIds.indexOf(clickCount)];
            console.log('in double click, slots, currentValue is', currentValue);
            fillActiveSpace();
            checkIfLost();
        } else if ( blockIds.indexOf(board[clickCount]) > -1 ) { // you're on a block
            console.log('in double click, blocks, currentValue is', currentValue);
            fillActiveSpace();
            checkIfLost();
        } else {
            console.log("error");
        }
    } else {
        console.log('game is over, cant click');
    }
}