## Introduction

- try using our search algorithms on a real problem (BFS & DFS)
- need a data structure similar (but no identical) to a binary tree
- 2 steps forward and 1 step to the side

## Assignment

- build a function `knightMoves` that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way
- you can think of the board as having 2-dimensional coordinates. You function would therefore look like:
  - `knightMoves([0,0],[1,2]) == [[0,0],[1,2]]`
  - `knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]`
  - `knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]`

1. Put to gether a script that creates a game board and a knight
2. treat all possible moves the knight could make as children in a tree.
3. don't allow any moves to go off the board
4. decide which search algorithm is best to use for this case
5. hint: one of them could be a potentially infinite series
6. use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square
7. output that full path looks like:

> `knightMoves([3,3],[4,3])` > `=> You made it in 3 moves! Here's your path: ` > `[3,3]` > `[4,5]` > `[2,4]` > `[4,3]`

## Pseudo code

- take `start` and `end` arguments
- create an array of all possible moves
- create an array to store all `visited` position
- create a `queue` to store all positions to visit
  - each item in the `queue` is an object which has 1 property is `position`, and 1 property is `path`
  - make `start` first item in the queue
- while the `queue` is not empty
  - take out 1 item in the `queue`
  - check if that item's `position` equal to `position` of `end` then return item's path if true
  - if not then check every other possible moves
    - if that `move` is legit and not visited yet
    - then add that move to `queue` with the `path` is copied from current item and that `move`'s `position`. E.g. `move.path=[...item.path,move.position]`

## Ideas to implement

- a website to display how the knight move
- do extra moves of all pieces left
