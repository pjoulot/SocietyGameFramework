window.addEventListener( "load", function() {

	var game = new SocietyGame();

	var gameboard1 = new GameBoard("#canvas");
	
	game.addBoard(gameboard1);

	gameboard1.setBackground("background.png");
	gameboard1.setBorder(10, "#000000");
	game.boards[0].setGrid(50, 50, 1, "#000000");

	var player1 = new Player();
	player1.xPosition = 1;
	player1.yPosition = 1;
	player1.setFixedImage("pion.png");
	game.addPlayer(player1);
	game.drawPlayers();
	
});