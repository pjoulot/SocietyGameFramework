/*
* Description : This object represent a board of a society game
* board : this is a css selector on a canvas element where the game will be draw
* width : width of the board
* height :height of the board
* widthBlock : width of a board's block
* heightBlock : height of a board's block
* Return : none
*/
function GameBoard(board) {
	this.canvas = document.querySelector( board );
	
	this.board = canvas.getContext( '2d' );
	this.width = canvas.width;
	this.height = canvas.height;
	this.widthBlock = 0;
	this.heightBlock = 0;
	
	/*
	* Description : Draw a Border for your game board
	* thickness : thickness of your border
	* color : color of your border
	* Return : none
	*/
    this.setBorder = function(thickness, color) {
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
	* thickness : thickness of your border
	* color : color of your border
	* Return : none
	*/
	this.setGrid = function(width, height, thickness, color) {
	
		this.widthBlock = width;
		this.heightBlock = height;
	
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
} 