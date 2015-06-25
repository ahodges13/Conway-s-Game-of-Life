'use strict';

angular.module('conwaysgameoflifeApp')
  .controller('MainCtrl', function ($scope, logic, $timeout) {

    //Set up the game
    var game={};
    $scope.height = 10;
    $scope.width = 10;
    game.height = $scope.height;
    game.width = $scope.width;

    $scope.$watch('height', function() {
      game.height = $scope.height;
      $scope.clear();
    });

    $scope.$watch('width', function() {
      if($scope.width<=50){
        game.width = $scope.width;
        $scope.clear();
      }
    });

    //Repaint the blank grid
    $scope.clear = function() {
      game.grid = logic.startGame(game.height, game.width);
      $scope.grid = game.grid;
    }

    //Turn a cell from alive to dead & vice versa
    $scope.toggle = function(row, col){
      game.grid[row][col] = !game.grid[row][col];
      $scope.grid = game.grid;
    };

    $scope.random = function(){
      $scope.clear();
      var times = _.random(1,game.height * game.width);
      console.log("times = "+times);
      _.times(times, function(){
        game.grid[_.random(0,game.height-1)][_.random(0,game.width-1)] = true;
      });
    };

    //Start the game
    $scope.play = function() {
      game.stillAlive = true;
      continuous();
    };

    //Stop the game
    $scope.stop = function() {
      game.stillAlive = false;
    };

    //Continuously loop through the steps until there are no more alive cells
    function continuous() {
      if (game.stillAlive) {
        console.log("got into the if statement");
        game = logic.iterate(game);
        $scope.grid = game.grid;
        $timeout(continuous, 1000);
      }
    }

    //Set up the grid when the page loads
    $scope.clear();
    console.log("original game.grid = "+game.grid);
  });
