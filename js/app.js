var board = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37];
var blockIds = [0,3,7,10,13,17,20,23,27,30,33,37];
var blockValues = [];
var slotIds = [1,2,4,5,6,8,9,11,12,14,15,16,18,19,21,22,24,25,26,28,29,31,32,34,35,36];
var slotValues = [];
var clickCount = 0;
var boardLocation = 0;
var currentBlock = 0;
var slot1 = 0;
var i = 0;
var j = 0;

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
    firstOrSecondSlot = randomNumber0Through1();
    if (firstOrSecondSlot === 0) {
        console.log('one correct, and that correct is first slot');
        firstCorrect = randomNumberNeg9Through9();
        if ((currentBlock+firstCorrect) >= 0 && (currentBlock+firstCorrect) <= 9) {
            console.log('firstCorrect is initally ' + firstCorrect);
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        } else {
            while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
                firstCorrect = randomNumberNeg9Through9();
                console.log('(in while loop) firstCorrect is ' + firstCorrect);
            }
            slotValues[j] = firstCorrect;
            document.getElementById(slotIds[j].toString()).textContent = slotValues[j];
            j++;
        }
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
        slotValues[j+1] = firstCorrect;
        document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
        j++;
    } else {
        while ((currentBlock + firstCorrect) < 0 || (currentBlock + firstCorrect) > 9) {
            firstCorrect = randomNumberNeg9Through9();
            console.log('(in while loop) firstCorrect is ' + firstCorrect);
        }
        slotValues[j+1] = firstCorrect;
        document.getElementById(slotIds[j+1].toString()).textContent = slotValues[j+1];
        j++;
    }
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
        blockValues[i] = currentBlock + firstCorrect;
        nextBlock = blockValues[i];
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
    i = 0;
    j = 0;
    blockValues[i] = randomNumber0Through9();
    currentBlock = blockValues[i];
    document.getElementById(blockIds[i].toString()).textContent = blockValues[i];
}
initialize();

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
            else if (routeNumberOutOfFive > 1 && routeNumberOutOfFive < 5 ) {
                generateTwoCorrectSlotsOfThree();
            }
            else if (routeNumberOutOfFive === 5) {
                generateThreeCorrectSlotsOfThree();
            }
        }
        i++;
        currentBlock = nextBlock;
        blockValues[i] = currentBlock;
        document.getElementById(blockIds[i].toString()).textContent = blockValues[i];
    }
}
generateBlocks();

function colorSlots() {
    
}


// page loaded assigning variables to each block/slot on the board to change it as the game progresses
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('up and running');
// })

function singleClick() {
    console.log('registered single click, count is '+clickCount);
    var currentElement = document.getElementById(clickCount.toString());
    currentElement.style.backgroundColor = 'white';
    clickCount++;
    currentElement = document.getElementById(clickCount.toString());
    currentElement.style.backgroundColor = 'green';
}

function doubleClick() {
    console.log('registered double click, count is '+clickCount);
    var currentElement = document.getElementById(clickCount.toString());
    currentElement.style.backgroundColor = 'white';
    clickCount += 2;
    currentElement = document.getElementById(clickCount.toString());
    currentElement.style.backgroundColor = 'green';
}


// window.document.addEventListener('click', singleClick());
// window.document.addEventListener('dblclick', doubleClick());

console.log('blockValues ' + blockValues);
console.log('slotValues ' + slotValues);