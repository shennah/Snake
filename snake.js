



var snakeGame = function(){

	// Canvas
	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	var cw = 15; // cell width // Each snake block


	// Score Counter
	var player1 = 0;
	var player2 = 0;



	// Array to render snake
	var snake;

	var initSnake = function(){
		var snakeLength = 6; // Starting length of snake. // Num of blocks
		snake = [] //Empty array
		for(var i = snakeLength - 1; i >= 0; i--) {
			snake.push({x: i, y: 0}); // Initialises snake from top left of canvas
		}
	}
	initSnake();


	// Draws the snake
	var drawSnake = function(){
		for(var i = 0; i < snake.length; i++) {
			var s = snake[i];
				ctx.fillStyle = "pink"; // Snake fill colour
				ctx.fillRect(s.x*cw, s.y*cw, cw, cw);
				ctx.strokeStyle = "green"; // Snake border colour
				ctx.strokeRect(s.x*cw, s.y*cw, cw, cw);
		}
	}
	drawSnake();

}

snakeGame();