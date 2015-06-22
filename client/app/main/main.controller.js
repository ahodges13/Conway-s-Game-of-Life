'use strict';

angular.module('conwaysgameoflifeApp')
  .controller('MainCtrl', function ($scope, logic) {

    //Set up a generic grid size
    var height = 10;
    var width = 10;

    //Set up the grid when the page loads
    $scope.grid = logic.startGame(height, width);

    //Repaint the blank grid
    $scope.clear = function() {
      $scope.grid = logic.startGame(height, width);
    }

    //Turn a cell from alive to dead & vice versa
    $scope.toggle = function(row, col){
      $scope.grid[row][col] = !$scope.grid[row][col];
    };

    //Start the game
    $scope.play = function() {
      $scope.grid = logic.iterate($scope.grid);
    };

  });
