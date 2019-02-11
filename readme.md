# intejump

## Use simple addition and subtraction to jump or double jump, matching your current value to block values to score.
___
## How to play
### Game Controls

The user jumps their way through the game, with the current cumulative value shown on the current (green block. The user can either single jump to add the value on the next tile to their current value, or double jump to skip the next tile, then add the one after that to the current value. 


![alt text](https://github.com/orjames/gameproject/blob/master/img/left_right_instructions.JPG "instructions 1")

![alt text](https://github.com/orjames/gameproject/blob/master/img/fourth_singe_double_jump.JPG "instructions 2")

![alt text](https://github.com/orjames/gameproject/blob/master/img/second_current_value_goal_value.JPG "instructions 3")

![alt text](https://github.com/orjames/gameproject/blob/master/img/first_blocks_and_score.JPG "instructions 4")

![alt text](https://github.com/orjames/gameproject/blob/master/img/fifth_ways_to_lose.JPG "instructions 5")


#### Advancing a Level

The user advances a level when they reach the final block of the level (shown in red)

As the user advances each level, the timer bar at the bottom of the page moves faster and faster.

___

# Development

## Wireframes & Concepts

I knew I wanted to create a puzzle oriented game, and I wanted to focus on the logic of the game as my main challenge. I figured a number-based game would be both fun for me and challenging logic-wise. I settled on a game where you rapidly try to add and subtract to reach a given value. I came up with some ideas and began wireframing.

![alt text](https://wireframe.cc/zw3cCq "wireframe")

I originally planned on just having two slots for every move for simplicity, but decided to go with a mix between three and two slots between each block.

Developing the logic was the hardest part I figured, so I sat down with my notepad and started thinking about edge cases, limitations, ways to test these. I decided block values should be between 0 - 9 (these are the values your cumulative number is trying to match), then set out to find a random way of determinging the spaces inbetween (called slots).

For places where there are tow slots between blocks, ie block-slot-slot-block, I decided to randomly select if there was one planned correct slot or two planned correct slots (50/50).

| Two Slots Possible combinations| |
| -------------- | -------------- |
| correct        | correct        |
| incorrect      | correct        |
| correct        | incorrect      |

In the case of one correct slot, I decided to randomly select if that were the first slot or the second, to keep the game from being predictable.

Similarly, where there were three slots between blocks, I found there were five combinations of moves to reach the next slot:

| Three Slots Possible combinations|||
| --------- |-----------| ----------|
| correct   | correct   | correct   |
| correct   | correct   | incorrect |
| correct   | incorrect | correct   |
| incorrect | correct   | correct   |
| incorrect | correct   | incorrect |

I broke these into three cases: one correct (1/5 probability of occuring), two correct (3/5 probability of occuring), three correct (1/5 probability of occuring).

For the one correct and three correct cases, the location of the slots didn't matter because it had to be in the middle for one correct, and it was all three for three correct. For the three correct case, I made the first slot number random between -9 and 9 so long as the total (current slot plus previous block) was within the -9 to 9 bounds. So on so forth until the next block was = previous block + 1st slot + 2nd slot + 3rd slot. Each addition I was ensuring the total was within the -9 to 9 bounds.

I did the same step for the one correct case, albeit only once.

For the two correct case, I randomly selected which two slots would be correct, then using similar mechanics as above calculated thier values. The incorrect slot is a random integer between -9 and 9.

--

## Starting Development
On the Monday following the weekend planning, I laid out my plans for the week ahead and the steps I'd need to take to get there.

Generating the board was my largest hurdle. Over the weekend I had completed the pseudocode to begin doing this, and laid out the logic. I set out using DOM manipulation to output the values generated on the board design I had come up with.

By the end of the day Monday, I had the logic all ready to implement a game board, added a for loop and was able to generate a board full of values with what I thought were correct slot values to form a viable path to victory. It didn't take long to test out and find that there was at least one bug.

## Sorting Out Bugs, Refactoring Code, Digging Under the Hood

I thought I was ahead of schedule until I noticed there were instances when the game board was set up correctly (ie there was a pathway to the end block), but many instances where there weren't. What did I do to fix this? Console. Log. Everything.

A whole day and hundreds of tests later, I foudn my issue. A line of code reasigning a value of my block value arrays twice each time it runs throught the overarching for loop.

However, when I ran into this problem, I had to analyze every line of my code and I found what I beleived were insances of redundant code. I took note of where these were, and decided that if I had time later on the week, I would find a way to clean this up. Right then though, I was more focused on getting a minimum viable product out (gotta appease the investors!).

## Making the Game an Actual Playable Game

So I had the game board setup (still a couple bugs unbeknownst to me at the time), now how can I make it a playable game? I knew I wanted to tailor the experience for mobile phones, particularly the iphone. In chrome I used the developer tools to see how the board would look on an Iphone X and made some minor adjustments to the board, running into some fairly frustrating CSS roadblocks particularly wiht my grid layout.

I got the board to a working draft and then ran into a roadblock immediately with my progression mechanics. Since I wanted it to be a mobile app, I wanted one touch to be a single jump, and a double tap to be a double jump. Simple enough right? Wrong. After looking online, consulting with colleagues, sould searching, etc. I couldn't find a viable way to get the double touch to be registered as a double touch and not two single touches followed by a double touch. After frustrating hours, I conceded and decided to shelf this project if I had more time later. I opted for a tap on the left side of the screen to be a single jump, a tap on the right side to be a double jump. It was fairly intuitive and I was happy with the result.

I had my jump mechanics, next I needed to show where the user was within the game. I used DOM manipulation to output the current value to the value shown on the block/slot the player was on. I found a nice green on materialize and went with that color for the current slot. A few beta tests with other people and I got feedback that most were confused as to where they were on the board still, so I put a pulse shadow on the current piece which helped.

I then decided to clear the previous slots that were played to make the user feel like they progressed through each level a little more. When my draft game was up and running this is the psuedocode process of functions that were ran in order:

1. Initialize //sets all values to zero, starts the background color change transition, randomly creates first block value, triggers generateBlocks function (later it calls functions to start the theme music and a couple formatting things like color coding positive vs negative numbers, etc.)
2. function generateBlocks // this calls a bunch of other fucntions in it, but for brevity, we'll  just say it generates all the values for the entire game board.
3. single click or double click // these change the value of your cumulative total, ups the click count, and call other functions to change the look of the board so a user can progress through the game
  4. Check if lost // looks at all the possible conditions you could lose, and checks the one condition in which you could win, thus      calls one of two functions - updateYouLost, updateYouWon
  4a. updateYouLost/updateYouWon // these functions are triggered once the player wins or loses, update the game board to reflect it, resets the timer, activates the button to restart or go to the next level
 5. fillActiveSpace and emptyPreviouslyActiveSpace // these make the game show that the player has progressed based on how much they clicked (single or double), they change to formatting of the current space, then revert the previous space to normal formatting and remove the number from it so now its black
 
## Working Game! Now Features

I had a game that worked! (not flawlessly but we'll get to that). Next I wanted to implement some features to add intrigue to the game, these included:

 Markup : * Timer
              * opted to switch into a value bar that fills as time progresses as opposed to a countdown
                  * added the background color transition from white to red to add sense of urgency
          * Levels (total time alotted to each level decreases by 10 seconds each level)
          * Instructions screen
          
making the timerbar was tricky because I didn't want to hardcode the value, so I implemented a levels counter to change how much time the user had for each level

the levels were fairly simple. Since the board was randomly generated, I couldn't think of a way to make the paths more difficult without changing the entire board layout to maybe include more three segments. I opted to just reduce the time allowed each subsequent level, after some testing, found that 10 seconds was a good time to reduce by.

the instructions screens presented a challenge because I couldn't find a good way to have the whole board dissapear. Instead I used a div with absolute positioning in front of the board. Working with the instructions was actually extremely challenging to get into words in a concise and clean way. I bounced a lot of ideas of colleagues and beta testers. I settled on images being the easiest way to explain the game (a picture is worth a thousand words). In the future I'd like to find a way to put video instructions in there to make them more seamless, some people are still unsure how to play even after the instructions.

## Refactoring Code

I first found every time I used getElementById, querySelector, etc. and assigned these to a variable within the DOMContentLoaded event listener. This helped make the app more efficient.

Next I went back to my code and was able to eliminate over 100 lines of reduntant code within the generate board function

Markup :  `code()`
Markup : ```javascript
         
// makes two correct slots out of two slot spaces
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
```

## In the works
Hoping to implement some of these soon!
- [ ] Refactoring code to DRY it out
- [ ] Double tap mechanics
- [ ] Power-up / bonus meter for extra points
- [x] Ability to pause
- [x] Ability to pause music
- [ ] Change all buttons to icons with no text (cleaner feel)
- [ ] fully adaptive layout
- [ ] video demonstration for instructoins

___
## Game Art & Sounds
HUGE THANKS TO THESE FOLKS who have released their work for free use under various Creative Commons Licenses!
