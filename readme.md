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

| Two Slots Possible combinations |
| -------------- |:--------------:|
| correct        | correct        |
| incorrect      | correct        |
| correct        | incorrect      |

In the case of one correct slot, I decided to randomly select if that were the first slot or the second, to keep the game from being predictable.

Similarly, where there were three slots between blocks, I found there were five combinations of moves to reach the next slot:

| Three Slots Possible combinations |
| --------- |:---------:| ---------:|
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
On the Monday following the weekend planning, I laid out my plans for the week and the steps I'd need to take to get there.

Generating the board was my largest hurdle. Over the weekend I had completed the pseudocode to begin doing this, and laid out the logic. I set out using DOM manipulation to output the values generated on the board design I had come up with.



My goal for the first day was to be able to halt action in the dungeon, reveal the battle interface and return to the dungeon setting. 

After a morning of setting up the page, css and little more reading on canvas. I started hammering away at my app.js strictly using ES6 conventions for the practice.

By early afternoon, I had a met my goal... or so I thought.

## The Frustrating Duality of my Game Loop
Per my plan, the second day of development I started coding the turn based battle logic. 

The idea was that the player and computer controlled crawler would face off taking turns rolling dice to damage the other. 

However, as I began testing my game, something wasn't right. The roll of an eight sided die was causing massive amounts of damage. As the example shows below, the monster, 'm', has some major health issues after a single push of a button.


When I started logging each roll, it became obvious that the attack was happening 30 - 50 times before the logic to return to the dungeon was triggering. I was baffled -- and started looking for the cause. After some deliberation and discussion with my instructors, we identified the cause. In order to create an animation effect in canvas, one must clear and redraw the screen. In my case, I was using `setInterval()` to trigger a redraw every 60ms so that the player appeared to run around the dungeon.

As it turns out, my success the day before was an illusion...I had set up the interval to stop the action in the dungeon and start showing the battle interface... but it was also triggering the battle logic repeatedly until the computer controlled crawler was far past dead. 

So I went back to the drawing board and started thinking of the correct way to break in and out of the game loop.

Eventually, I came to this pattern:

- declare a global variable, `gameLoopHandle`, leaving it undefined
- create a boolean for state the game is in, `dungeonMode`
- write a function with logic that listens for an encounter that clears the interval and starts the battle, `setLoopInterval()`
- Once the DOM has loaded completely, assign `setLoopInterval()` to `gameLoopHandle`
- Once battle is done, set `dungeonMode` back to true and assign `setLoopInterval()` to `gameLoopHandle` again

Success! I had it working -- but half a day behind my plan.

...and oh boy did I make a mess trying to debug and rework what I had already written to work with this better design.

## Scrapping the draft
Late Wednesday morning, I met with my instructor after struggling a bit to untangle my logic... and asked the question I had been avoiding. "How often have you thrown out a large chunk of your work and started again from scratch?" I received the reassurance that I was looking for and decided that scrapping it was a better path to take than continuing with the current iteration. After lunch, I pulled the trigger and started reading through my code to see what I could salvage.

## Rewrite with scale in mind

Having written the first iteration in ES6, I ran into a few issues as I did not have babel and a task runner set up to in my development environment. Instead of spending time learning the right way to set up the build, I decided to write the second iteration using ES5 conventions. 

My first real experience with learning OOP was in Ruby, and ES6's new syntactic sugar for `class` had a familiarity that drew me in at the outset of this project. Rewriting in ES5 gave me a chance to practice using JavaScript's prototypal inheritance syntax with my Crawler, Hero and Mover objects. 

I was also able to take some of the patterns from the first iteration and make them more scaleable. This time around, created a function to randomly generate multiple crawlers. Further, I designed the collision detection to pick up and start battle with any of my random crawlers. By Wednesday afternoon, I had surpassed the progress of the previous two days.


## In the works
Hoping to implement some of these soon!
- [ ] Refactoring a few things
- [ ] Modal showing controls and instructions
- [ ] More responsive layout
- [x] Ability to pause
- [x] Audio
- [ ] **Mute button**
- [ ] Mobile controls
- [ ] Change the system so that leveling up occurs after the dungeon is cleared
- [ ] Hero Choice
- [ ] More crawler variety
- [ ] Scoring system
- [ ] Use Local Storage to save highscores or player's current stats
- [ ] Rats!! 🐀
- [ ] Dungeon walls, mazes and obstacles.
- [ ] `imp.hunt()` using Dijkstra's Hero Tracking algorithm 👹
___
## Game Art & Sounds
HUGE THANKS TO THESE FOLKS who have released their work for free use under various Creative Commons Licenses!
