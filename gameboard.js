/*
* Description : This object represent a board of a society game
* board : this is a css selector on a canvas element where the game will be draw
* width : width of the board
* height :height of the board
* widthBlock : width of a board's block
* heightBlock : height of a board's block
* background : image of the background
* borderThickness : thickness of the border of the board
* borderColor : color of the border of the board
* gridThickness : thickness of the border of the grid
* gridColor : color of the border of the grid
* Return : none
*/
function GameBoard(board) {
	this.canvas = document.querySelector( board );
	
	this.board = canvas.getContext( '2d' );
	this.width = canvas.width;
	this.height = canvas.height;
	this.widthBlock = 0;
	this.heightBlock = 0;
	this.background = "";
	this.borderThickness = 0;
	this.borderColor = "transparent";
	this.gridThickness = 0;
	this.gridColor = "transparent";
	
	/*
	* Description : Draw a Border for your game board
	* thickness : thickness of your border
	* color : color of your border
	* Return : none
	*/
    this.setBorder = function(thickness, color) {
		this.borderThickness = thickness;
		this.borderColor = color;
	
	    this.board.strokeStyle = color;
		this.board.lineWidth = thickness;
		this.board.beginPath();
		this.board.moveTo(0,0); 
		this.board.lineTo(this.width,0);
		this.board.moveTo(this.width,0);
		this.board.lineTo(this.width,this.height);
		this.board.moveTo(this.width,this.height);
		this.board.lineTo(0,this.height);
		this.board.moveTo(0,this.height);
		this.board.lineTo(0,0);
		this.board.closePath();
		this.board.stroke();
    }
	
	/*
	* Description : Draw a Grid for your game board
	* width : width of your unit block
	* height : height of your unit block
	* thickness : thickness of your border (Warning, if you use 1 pixel , some browsers will put a 2px border with a lighter color)
	* color : color of your border
	* Return : none
	*/
	this.setGrid = function(width, height, thickness, color) {
	
		this.widthBlock = width;
		this.heightBlock = height;
		this.gridThickness = thickness;
		this.gridColor = color;
	
		if(this.width % width != 0 || this.height % height != 0) {
			console.log("WARNING: the size of unit block is not a multiple of your total size");
		}

		//Drawing
		this.board.strokeStyle = color;
		this.board.lineWidth = thickness;
		this.board.beginPath();
		
		for(var h = height ; h < this.height ; h += height) {
		   this.board.moveTo(0, h);
		   this.board.lineTo(this.width, h);
		}

		for(var w = width ; w < this.width ; w += width) {
		   this.board.moveTo(w, 0);
		   this.board.lineTo(w, this.height);
		}

		this.board.closePath();
		this.board.stroke();
	}
	
	/*
	* Description : Draw an image on the canvas
	* imagePath : path of the image drawn on the canvas
	* Return : none
	*/
	this.setBackground = function(imagePath) {
		var img = new Image();
		img.src = imagePath;
		this.board.drawImage(img, 0, 0);
		this.background = img;
	}
	
	/*
	* Description : Fill the canvas with a color
	* color : color of the background
	* Return : none
	*/
	this.fillColor = function(color) {
		this.board.fillStyle = color;
		this.board.beginPath();
		this.board.rect(0, 0, this.width, this.height);
		this.board.closePath();
		this.board.fill();
	}
	
	/*
	* Description : Color a tile of the board
	* x : position on the x-axis
	* y : position on the y-axis
	* color: color used to fill the tile
	* Return : none
	*/
	this.setTileColor = function(x, y, color, opacity) {
		this.board.fillStyle = color;
		this.board.globalAlpha = opacity;
		this.board.beginPath();
		this.board.rect(x * this.widthBlock, y * this.heightBlock, this.widthBlock, this.heightBlock);
		this.board.closePath();
		this.board.fill();
		
		if(this.gridColor != "transparent") {
			this.board.lineWidth = this.gridThickness;
			this.board.fillStyle = this.gridColor;
			this.board.beginPath();
			this.board.rect(x * this.widthBlock, y * this.heightBlock, this.widthBlock, this.heightBlock);
			this.board.closePath();
			this.board.stroke();
		}
		this.board.globalAlpha = 1;
	}
	
	/*
	* Description : Set a background on a tile of the board. Use an image with the correct dimensions!
	* x : position on the x-axis
	* y : position on the y-axis
	* imagePath : path of the image drawn on the canvas
	* Return : none
	*/
	this.setTileImage = function(x, y, imagePath) {
		var img = new Image();
		img.src = imagePath;
		this.board.drawImage(img, x * this.widthBlock, y * this.heightBlock);
	}
	
	/*
	* Description : Repaint a tile (update) Used when something move on the case or if something appear on it
	* x : position on the x-axis
	* y : position on the y-axis
	* Return : none
	*/
	this.repaintTile = function(x, y) {
		//Repaint the background
		if(this.imagePath != "") {
			this.board.drawImage(this.background, x * this.widthBlock, y * this.heightBlock, this.widthBlock, this.heightBlock, x * this.widthBlock, y * this.heightBlock, this.widthBlock, this.heightBlock);
		}
		//Repaint the border
		if(this.gridColor != "transparent") {
			this.board.lineWidth = this.gridThickness;
			this.board.fillStyle = this.gridColor;
			this.board.beginPath();
			this.board.rect(x * this.widthBlock, y * this.heightBlock, this.widthBlock, this.heightBlock);
			this.board.closePath();
			this.board.stroke();
		}
	}
	
	/*
	* Description : Draw a player on the board
	* player : an object Player
	* Return : none
	*/
	this.drawPlayer = function(player) {
		if(player.fixedImage != false) {
			this.board.drawImage(player.fixedImage, player.xPosition * this.widthBlock, player.yPosition * this.heightBlock);
		}
	}
	
	/*
	* Description : Move an object sliding
	* object : an object which can be a player or an object
	* direction : {"right", "left", "up", "down"}
	* speed : speed to move the object
	* Return : none
	*/
	this.slideTo = function(object, direction, speed) {
		var varBoard = this;
		var ctx = this.board;
		var widthCase = this.widthBlock;
		var heightCase = this.heightBlock;
		
		//Update of the position of the Object
		if(object.objectName == "Player"){
			var xPosition = object.xPosition;
			var yPosition = object.yPosition;
			var image = object.fixedImage;
			switch(direction) {
			case "right":
				object.xPosition += 1;
				break;
			case "left":
				object.xPosition -= 1;
				break;
			case "up":
				object.yPosition -= 1;
				break;
			case "down":
				object.yPosition += 1;
				break;
			}
		}
		
		//Slide Effect
		var x = 0;
		var y = 0;
		switch(direction) {
			case "right":
			var id = setInterval(function() {
				ctx.clearRect(xPosition * widthCase + x, yPosition * heightCase , widthCase, heightCase);
				
				//Repaint the previous elements
				varBoard.repaintTile(xPosition , yPosition);
				varBoard.repaintTile(xPosition + 1 , yPosition);
				varBoard.setBorder(varBoard.borderThickness, varBoard.borderColor);
				
				//Paint the moving object
				ctx.drawImage(image, xPosition * widthCase + x, yPosition * heightCase);
				x += 1;
				if (x == widthCase) {
					clearInterval(id); 
				}			
			}, speed);
			break;
			case "left":
			var id = setInterval(function() {
				ctx.clearRect(xPosition * widthCase - x, yPosition * heightCase , widthCase, heightCase);
				
				//Repaint the previous elements
				varBoard.repaintTile(xPosition , yPosition);
				varBoard.repaintTile(xPosition - 1 , yPosition);
				varBoard.setBorder(varBoard.borderThickness, varBoard.borderColor);
				
				//Paint the moving object
				ctx.drawImage(image, xPosition * widthCase - x, yPosition * heightCase);
				x += 1;
				if (x == widthCase) {
					clearInterval(id); 
				}			
			}, speed);
			break;
			case "up":
			var id = setInterval(function() {
				ctx.clearRect(xPosition * widthCase, yPosition * heightCase - y , widthCase, heightCase);
				
				//Repaint the previous elements
				varBoard.repaintTile(xPosition , yPosition);
				varBoard.repaintTile(xPosition , yPosition - 1);
				varBoard.setBorder(varBoard.borderThickness, varBoard.borderColor);
				
				//Paint the moving object
				ctx.drawImage(image, xPosition * widthCase, yPosition * heightCase - y);
				y += 1;
				if (y == heightCase) {
					clearInterval(id); 
				}			
			}, speed);
			break;
			case "down":
			var id = setInterval(function() {
				ctx.clearRect(xPosition * widthCase, yPosition * heightCase + y , widthCase, heightCase);
				
				//Repaint the previous elements
				varBoard.repaintTile(xPosition , yPosition);
				varBoard.repaintTile(xPosition , yPosition + 1);
				varBoard.setBorder(varBoard.borderThickness, varBoard.borderColor);
				
				//Paint the moving object
				ctx.drawImage(image, xPosition * widthCase, yPosition * heightCase + y);
				y += 1;
				if (y == heightCase) {
					clearInterval(id); 
				}			
			}, speed);
			break;
		}
	}
	
	/*
	* Description : Move an object using a route to move on several tiles
	* object : an object which can be a player or an object
	* route : the route to follow. This must be an array with the value "right", "left", "up", "down". Example: ["left", "right", "up", "left"]
	* speed : speed to move the object
	* Return : none
	*/
	this.routeTo = function(object, route, speed) {
		var varBoard = this;
		var queueDirection = [];
		var widthCase = this.widthBlock;
		var heightCase = this.heightBlock;
		
		for(var i = 0; i < route.length; i++) {
			queueDirection.push(route[i]);
			if(route[i] == "left" || route[i] == "right") {
				// +50 is for the calcul time and avoid some lags
				setTimeout(function() {
					var direction = queueDirection.shift();
					varBoard.slideTo(object, direction, speed);
				}, widthCase * speed * i + 50);
			}
			else {
				// +50 is for the calcul time and avoid some lags
				setTimeout(function() {
					var direction = queueDirection.shift();
					varBoard.slideTo(object, direction, speed);
				}, heightCase * speed * i + 50);
			}
		}
	}
} 