'use strict';

angular.module('conwaysgameoflifeApp')
  .controller('MainCtrl', function ($scope) {

    //Set up a generic grid size
    $scope.height = 10;
    $scope.width = 10;

    //Build the grid, based on specs
    $scope.startGame = function(height, width) {
      var grid = [];
      for(var i=0;i<height;i++){
        var row = [];
        for(var k=0;k<width;k++){
          row.push(false);
        }
        grid.push(row);
      }
      $scope.grid = grid;
    };

    //Repaint the blank grid
    $scope.clear = function() {
      $scope.startGame($scope.height, $scope.width);
    }

    //Turn a cell from alive to dead & vice versa
    $scope.toggle = function(row, col){
      $scope.grid[row][col] = !$scope.grid[row][col];
    };

    //Start the game
    $scope.play = function() {
        $scope.iterate($scope.grid);
    };

    //Run through one iteration of the game of life
    $scope.iterate = function(currentGrid) {
      var newGrid = [];
      for(var i=0;i<currentGrid.length;i++){
        var newRow = [];
        for(var k=0;k<currentGrid[i].length;k++){
          //If cell is already alive, check if it will continue to live
          if(currentGrid[i][k]){
            var answer = $scope.willLive(currentGrid, i, k);
            newRow.push(answer);
          }
          //If cell is already dead, check if it will be born to become alive
          else {
            var answer = $scope.isBorn(currentGrid, i, k);
            newRow.push(answer);
          }
        }
        newGrid.push(newRow);
        newRow = [];
      }
      //Repaint the new board, after the iteration is complete
      $scope.grid = newGrid;
    };

    //Check is a cell that is alive will live through the iteration
    $scope.willLive = function(grid, row, col) {
      //Any live cell with two or three live neighbours lives on to the next generation
      var neighbours = $scope.getNeighbours(grid, row, col);
      if(neighbours >= 2 && neighbours <=3){
        return true;
      }
      return false;
    };

    //Check if a cell that is dead will be born
    $scope.isBorn = function(grid, row, col) {
      //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction
      var neighbours = $scope.getNeighbours(grid, row, col);
      if(neighbours == 3){
        return true;
      }
      return false;
    };

    //Count how many neighbours of this cell are alive
    $scope.getNeighbours = function(grid, row, col) {
      var count = 0;
      count += $scope.validCell(grid,row-1,col-1) ? 1 : 0;
      count += $scope.validCell(grid,row-1,col) ? 1 : 0;
      count += $scope.validCell(grid,row-1,col+1) ? 1 : 0;
      count += $scope.validCell(grid,row,col-1) ? 1 : 0;
      count += $scope.validCell(grid,row,col+1) ? 1 : 0;
      count += $scope.validCell(grid,row+1,col-1) ? 1 : 0;
      count += $scope.validCell(grid,row+1,col) ? 1 : 0;
      count += $scope.validCell(grid,row+1,col+1) ? 1 : 0;
      return count;
    };

    //Check that a cell is within the bounds of the grid
    $scope.validCell = function(grid, row, col) {
      if(row>=0 && row<grid.length && col>=0 && col<grid[0].length){
        if(grid[row][col]){
          return true;
        }
      }
      return false;
    };

    //Set up the grid when the page loads
    $scope.startGame($scope.height, $scope.width);

  });
