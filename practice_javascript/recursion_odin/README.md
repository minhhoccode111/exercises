# Recursion top

Solutions to the Odin Project Node path, Javascript course, DSA sub-course, Project Recursion

## How to test something?

Open the file and type in `node [path-to-file]` in the terminal.
The answer should correspond to the commented code result!

## Merge sort

In merge sort, the idea of the algorithm is to sort smaller arrays and then combine those arrays together (merge them) in sorted order.
Merge sort leverages something called recursion.

## Merge sort Pseudo-code

- a function named mergeSort which a an unsorted array as argument
- check if that arr's length is less than 2
  - if yes, then return the array because it's already been sorted
- if not then we divide the array to 2 halves
- then recursively pass each half as argument into the mergeSort function again
- then merge 2 sort halves back together
- using another function to do that functionality
  - that function can even use recursion to sort instead of loops
