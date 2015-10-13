



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


	/////// Render Food ////////

	var makeFood = function() {
		var food = {
			x: Math.floor(Math.random() * w / cw), // spawns food in length/width of canvas minus 1 cw
			y: Math.floor(Math.random() * h / cw)
		}
		// store in foodBits // push into array
		foodBits.push(food);

	}

	var drawFood = function() {
		// loop through foodBits // for loop
		for(var i = 0; i < foodBits.length; i++) {
			var f = foodBits[i];
			ctx.fillStyle = "red"; // Snake fill colour
			ctx.fillRect(f.x*cw, f.y*cw, cw, cw);
			// ctx.strokeStyle = "green"; // Snake border colour
			// ctx.strokeRect(s.x*cw, s.y*cw, cw, cw);
		}
	}

	// function food collision

		////////////////////////


	// loop to check for food and head collision
		// another function to eat // remove food // call makeFood

	///////////////////////////////////

	// Score Counter
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


	// Draws the snake ///////////////
	var drawSnake = function(){


		// fills background colour after snake tail pop // prevents trail 

		ctx.fillStyle = "white"; // canvas fill colour
		ctx.fillRect(0, 0, 1000, 600);
		ctx.strokeStyle = "black"; // canvas border colour
		ctx.strokeRect(0, 0, 1000, 600);

		// Movement - Pop tail cell and place infront of head cell
		// Update snake position
		var head_x = snake[0].x;
		var head_y = snake[0].y;



		// Increments for new head position
		if (dir == "right") head_x++;
		else if (dir == "left") head_x--;
		else if (dir == "up") head_y--;
		else if (dir == "down") head_y++;

		/////////////////////////////

		//Telporting walls num test
		// if(head_x >= 1000/cw || head_x <= -1 || head_y >= 600/cw || head_y <= -1) {
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

		checkFoodCollision();

		for(var i = 0; i < snake.length; i++) {
			var s = snake[i];
				ctx.fillStyle = "pink"; // Snake fill colour
				ctx.fillRect(s.x*cw, s.y*cw, cw, cw);
				// ctx.strokeStyle = "green"; // Snake border colour
				// ctx.strokeRect(s.x*cw, s.y*cw, cw, cw);
		}

		drawFood()



	////////////////////////////////////

	// grow snake function

	// increase speed function



	// Keyboard Directions
	$(document).keydown(function(e){
		var key = e.which;

		if ((key === 37) && (dir != "right")) dir = "left";
		else if ((key === 38) && (dir != "down")) dir = "up";
		else if ((key === 39) && (dir != "left")) dir = "right";
		else if ((key === 40) && (dir != "up")) dir = "down";
	})

	

	}


	// Food Collision

	var checkFoodCollision = function() {

		var head_x = snake[0].x;
		var head_y = snake[0].y;

		for(var i = 0; i < foodBits.length; i++) {
			var f = foodBits[i];
			if (head_x == f.x && head_y == f.y) {
				console.log("eating")
				var tail = {
					x: head_x,
					y: head_y
				}
				makeFood();
			}

			else {
				for(var j = 1; j < snake.length; j++) {
				var s = snake[j];
					if(head_x == s.x && head_y == s.y) {
						console.log("Game Over")					
					}
				}
			}	
		}

	}

	initSnake()
	// drawSnake()
	makeFood()
	// drawFood()

	game_loop = setInterval(drawSnake, 100); // Sets starting speed // timer to trigger drawSnake function every 100ms


} // snakeGame()



snakeGame();





