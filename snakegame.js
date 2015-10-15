



var snakeGame = function(){

	// Canvas
	var canvas = document.getElementById("snakeCanvas");
	var ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;
	// console.log(w);
	// console.log(h)


	var cw = 15; // Cell width
	var dir = "right"// default starting direction


	var snake; // Array to render snake
	var foodBits = []; // Food Array


	// Score Counter
	var score = 0;
	var player1 = 0;
	var player2 = 0;



 	/// Render Snake///////////
	var initSnake = function(){
		var snakeLength = 6; // Starting length of snake. // Num of blocks
		snake = [] //Empty array
		for(var i = snakeLength - 1; i >= 0; i--) {
			snake.push({x: i, y: 0}); // Initialises snake from top left of canvas
		}
	}
	//////////////////////////////

	var isRegularFood = function() {
		for(var i = 0; i < foodBits.length; i++) {
			var f = foodBits[i];
			if (f.type === "regular") {
				return true;
			}
		}
		return false;
	}

	/////// Render Food ////////
	var makeFood = function() {
		if (!isRegularFood()) {
			console.log("Time for some new food!");
			var food = {
				x: Math.floor(Math.random() * w / cw), // spawns food in length/width of canvas minus 1 cw
				y: Math.floor(Math.random() * h / cw),
				type: "regular",
				colour: "#45B29D"
			}
			// store in foodBits // push into array
			foodBits.push(food);
		}

		// speed food
		if ((score + 1) % 3 === 0) {
			var food = {
				x: Math.floor(Math.random() * w / cw), // spawns food in length/width of canvas minus 1 cw
				y: Math.floor(Math.random() * h / cw),
				type: "speed",
				colour: "#EFC94C"
			}
			// store in foodBits // push into array
			foodBits.push(food);
			var indexOfSpeed = foodBits.indexOf(food);
			setTimeout(function() {
				foodBits.splice(indexOfSpeed, 1);
			}, 10000)
		}

	}


	// Standard Food
	var drawFood = function() {
		// loop through foodBits // for loop
		for(var i = 0; i < foodBits.length; i++) {
			var f = foodBits[i];
			ctx.fillStyle = f.colour; // Snake fill colour
			ctx.fillRect(f.x*cw, f.y*cw, cw, cw);
			// ctx.strokeStyle = "green"; // Snake border colour
			// ctx.strokeRect(s.x*cw, s.y*cw, cw, cw);
		}
	}


	///////////////////////////////////


	// fills background colour after snake tail pop // prevents trail 
	var drawBackground = function() {
		ctx.fillStyle = "#334D5C"; // canvas fill colour
		ctx.fillRect(0, 0, 1005, 600);
		// ctx.strokeStyle = "black"; // canvas border colour
		// ctx.strokeRect(0, 0, 1005, 600);
	}

	var updateSnake = function() {
		// Movement - Pop tail cell and place infront of head cell
		// Update snake position
		var head_x = snake[0].x;
		var head_y = snake[0].y;

		// Increments for new head position
		if (dir == "right") head_x++;
		else if (dir == "left") head_x--;
		else if (dir == "up") head_y--;
		else if (dir == "down") head_y++;


		//Telporting walls num test
		// if(head_x >= 1005/cw || head_x <= -1 || head_y >= 600/cw || head_y <= -1) {
		// 	console.log(head_y);
		// }

		//Teleporting walls
		if(head_x >= 67){
			head_x = 0;
		}
		else if(head_x <= -1){
			head_x = 67;
		}
		else if(head_y >= 40){
			head_y = 0;
		}
		else if(head_y <= -1){
			head_y = 40;
		}

		// 67 / cw
		/////////////////////////

		var tail = snake.pop(); // pops(removes) tail cell
		tail.x = head_x;
		tail.y = head_y;
		snake.unshift(tail); // Puts tail cell at the head of the snake
	}

	var drawSnake = function() {
		// draw snake cells
		for(var i = 0; i < snake.length; i++) {
			var s = snake[i];
				ctx.fillStyle = "#DF5A49"; // Snake fill colour
				ctx.fillRect(s.x*cw, s.y*cw, cw, cw);
				// ctx.strokeStyle = "green"; // Snake border colour
				// ctx.strokeRect(s.x*cw, s.y*cw, cw, cw);
		}		
	}

	// ///////////////



	// Food Collision

	var checkCollision = function() {

		var head_x = snake[0].x;
		var head_y = snake[0].y;

		// Food Collison
		for(var i = 0; i < foodBits.length; i++) {
			var f = foodBits[i];
			if (head_x == f.x && head_y == f.y) {
				if (f.type === "regular") {
					console.log("You got a regular food");

					var tail = {
						// get the x and y position of the last cell in the snake array (the tail)
						x: snake[snake.length-1].x, 
						y: snake[snake.length-1].y
					}

					snake.push(tail); // adds the new tail cell that's been created to the end of the array.
					// This block above extends the tail.
					foodBits.splice(i, 1); // This is what removes the food from the screen.
					i--; // dont skip next food bit
					makeFood();
					score++;

					$(document).ready(function(){
						$(".score").text(score);
					});	

					console.log("Score " + score)
					console.log("Snake length " + snake.length);
				} 

				else if (f.type === "speed") {
					var tail = {
						x: snake[snake.length-1].x, 
						y: snake[snake.length-1].y
					}
					snake.push(tail);
					foodBits.splice(i, 1);
					i--;
					score = score + 5;

					$(document).ready(function(){
						$(".score").text(score);
					});	

					console.log("Score " + score);

					console.log("You got a speed food");

					clearInterval(game_loop); // stop the currently running god method
					game_loop = setInterval(mainLoop, 50); // restart the god method with 50ms intervals (so it goes twice as fast).
					setTimeout(function() {
						// after 10 seconds, stop the 2x speed and revert to the original speed.
						console.log("Speed bonus ending");
						clearInterval(game_loop);
						game_loop = setInterval(mainLoop, 80);
						console.log(game_loop);
					}, 10000);
				}
			}

		// Body collision
			else {
				for (var j = 1; j < snake.length; j++) {
					var s = snake[j];
					
					if (head_x == s.x && head_y == s.y) {
						// console.log('head_x is ' + head_x);
						// console.log('head_y is ' + head_y);
						// console.log('s.x is ' + s.x);
						// console.log('s.y is ' + s.y);
						// console.log(snake[0]);
						// console.log(snake[snake.length-1])
						// console.log(JSON.stringify(snake));
						console.log("Game Over")
						gameOver();
						snakeGame();			
					}

				}
			}
		}

	} // food collision


	var mainLoop = function(){
		updateSnake();
		checkCollision();

		drawBackground();
		drawSnake();
		drawFood();
	}


	initSnake()
	makeFood()



	// Keyboard Directions
	$(document).keydown(function(e){
		var key = e.which;

		if ((key === 37) && (dir != "right")) dir = "left";
		else if ((key === 38) && (dir != "down")) dir = "up";
		else if ((key === 39) && (dir != "left")) dir = "right";
		else if ((key === 40) && (dir != "up")) dir = "down";
	})


	var gameOver = function() {
		clearInterval(game_loop);
		// alert("You died")

		swal ({
			title: "You died", 
			text: "Play again?",
			type: "warning"
		});

		$(".highscore").text(score);
		score = 0;
      		$('.score').text(score);
	}


	game_loop = setInterval(mainLoop, 80); // Sets starting speed // timer to trigger drawSnake function every 100ms


} // snakeGame()




snakeGame();





