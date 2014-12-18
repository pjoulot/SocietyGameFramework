/*
* Description : This object represent a player
* objectName : the name of the present object (type)
* order : order defines when the player can play (his turn)
* bot : takes the value "true" if this payer is controlled by a computer
* pnj : takes the value "true" if this payer is a PNJ (is not playable and is a sort of part of the game)
* xPosition : it is the line on the board occupied by the player
* yPosition : it is the column on the board occupied by the player

* fixedImage : the image of the player if it is not a sprite
* spriteImage : the sprite of the player if it is not a fixed image
* Return : none
*/
function Player() {
	// Non-graphic informations
	this.objectName = "Player";
	this.order;
	this.name;
	this.bot = false;
	this.pnj = false;
	// Grphic informations
	this.xPosition = 0;
	this.yPosition = 0;
	this.boardPosition = 0;
	this.fixedImage = false;
	this.spriteImage = false;
	
	/*
	* Description : Give a position on the board
	* x : the line on the board
	* y : the column on the board
	* Return : none
	*/
	this.setPosition = function(x, y) {
		this.xPosition = x;
		this.yPosition = y;
	}
	
	/*
	* Description : Define when the player can play
	* turn : his order in the game cycle
	* Return : none
	*/
	this.setFixedImage = function(imagePath) {
		var img = new Image();
		img.src = imagePath;
		this.fixedImage = img;
	}
}