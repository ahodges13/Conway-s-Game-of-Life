'use strict';

angular.module('conwaysgameoflifeApp')
  .service('logic', function (_) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //neighbour values
    var TOP_LEFT = [-1, -1];
    var TOP = [-1, 0];
    var TOP_RIGHT = [-1, 1];
    var MIDDLE_LEFT = [0, -1];
    var MIDDLE_RIGHT = [0, 1];
    var BOTTOM_LEFT = [1, -1];
    var BOTTOM = [1, 0];
    var BOTTOM_RIGHT = [1, 1];

    var NEIGHBORS = [TOP_LEFT, TOP, TOP_RIGHT, MIDDLE_LEFT, MIDDLE_RIGHT, BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT];

    //Build the grid, based on specs
    this.startGame = function(height, width) {
      var grid = [];
      _(height).times(function(i){
        var row = [];
        _(width).times(function(k){
          row.push(false);
        });
        grid.push(row);
      });
      return grid;
    };

    //Run through one iteration of the game of life
    this.iterate = function(game) {
      //Assume this is the last iteration, until a cell stays alive or is born
      game.stillAlive = false;
      //Repaint the new board, after the iteration is complete
      game.grid = _(game.grid.length).times(function(i){
        return _(game.grid[i].length).times(function(k){
          //If cell is already alive, check if it will continue to live
          //If cell is already dead, check if it will be born to become alive
          return game.grid[i][k] ? this.willLive(game, i, k) : this.isBorn(game, i, k);
        }, this);
      }, this);
      return game;
    };

    //Check is a cell that is alive will live through the iteration
    this.willLive = function(game, row, col) {
      //Any live cell with two or three live neighbours lives on to the next generation
      var neighbours = this.getNeighbours(game, row, col);
      if(neighbours >= 2 && neighbours <=3){
        game.stillAlive = true;
        return true;
      }
      return false;
    };

    //Check if a cell that is dead will be born
    this.isBorn = function(game, row, col) {
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
      var neighbours = this.getNeighbours(game, row, col);
      if(neighbours == 3){
        game.stillAlive = true;
        return true;
      }
      return false;
    };

    //Count how many neighbours of this cell are alive
    this.getNeighbours = function(game, row, col) {
      return _.filter(NEIGHBORS, function(neighbour){
        return this.validCell(game, neighbour[0]+row, neighbour[1]+col);
      }, this).length;
    };

    //Check that a cell is within the bounds of the grid
    this.validCell = function(game, row, col) {
      if(row>=0 && row<game.grid.length && col>=0 && col<game.grid[0].length){
        if(game.grid[row][col]){
          return true;
        }
      }
      return false;
    };

  });
