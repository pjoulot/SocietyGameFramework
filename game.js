window.addEventListener( "load", function() {

	var game = new SocietyGame();

	var gameboard1 = new GameBoard("#canvas");
	
	game.addBoard(gameboard1);

	gameboard1.setBackground("background.png");
	gameboard1.setBorder(10, "#000000");
	game.boards[0].setGrid(50, 50, 1, "#000000");
	
});