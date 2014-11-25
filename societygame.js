/*
* Description : This object represent a society game
* boards : this attribute contains all the boards of the society game
* players : this array contains all the players of the game
* Return : none
*/
function SocietyGame(players) {
	this.boards = new Array();
	this.currentBoard = 0;
	this.players = new Array();
	
	/*
	* Description : This method add a new board in the game
	* boards : a board of the game
	* Return : none
	*/
	this.addBoard = function(board) {
		this.boards.push(board);
	}
	
	/*
	* Description : This method add a new player in the game
	* player : a player of the game
	* Return : none
	*/
	this.addPlayer = function(player) {
		this.players.push(player);
	}
	
	/*
	* Description : This method add a new player in the game
	* player : a player of the game
	* Return : none
	*/
	this.drawPlayers = function() {
		for(var i = 0 ; i < this.players.length ; i++) {
			this.boards[this.currentBoard].drawPlayer(this.players[i]);
		}
	}
}