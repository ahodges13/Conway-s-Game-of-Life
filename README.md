# Conway's Game of Life

This is a program that emulates Conway's Game of Life.  There are 4 rules:

1.) Any live cell with fewer than two live neighbours dies, as if caused by under-population.  
2.) Any live cell with two or three live neighbours lives on to the next generation.  
3.) Any live cell with more than three live neighbours dies, as if by overcrowding.  
4.) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The grid is automatically set up as 10x10 cells.  You should click on whichever cells you'd like to begin alive, then click "Let's Play!" to proceed through each iteration of the evolution of the game.  

This was built using [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) & [flexboxgrid](https://github.com/kristoferjoseph/flexboxgrid).  

### Installation
`git clone https://github.com/ahodges13/Conway-s-Game-of-Life.git yourDirectory`
`cd yourDirectory`
`npm install`
`bower install`

### Requirements
NodeJS
Bower

### Usage
`cd yourDirectory`
`grunt serve`
