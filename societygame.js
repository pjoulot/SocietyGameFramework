/*
* Description : This object represent a society game
* boards : this attribute contains all the boards of the society game
* Return : none
*/
function SocietyGame() {
	this.boards = new Array();
	
	/*
	* Description : This object represent a society game
	* boards : this attribute contains all the boards of the society game
	* Return : none
	*/
	this.addBoard = function(board) {
		this.boards.push(board);
	}
}