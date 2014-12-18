window.addEventListener( "load", function() {

	var game = new SocietyGame();

	var gameboard1 = new GameBoard("#canvas");
	
	game.addBoard(gameboard1);

	gameboard1.setBackground("background.png");
	gameboard1.setBorder(10, "#000000");
	game.boards[0].setGrid(50, 50, 2, "#000000");

	var player1 = new Player();
	player1.xPosition = 1;
	player1.yPosition = 1;
	player1.setFixedImage("pion.png");
	game.addPlayer(player1);
	var player2 = new Player();
	player2.xPosition = 5;
	player2.yPosition = 5;
	player2.setFixedImage("pion.png");
	game.addPlayer(player2);
	game.drawPlayers();
	game.boards[0].setTileColor(5, 3, "#123456", 1);
	game.boards[0].setTileImage(5, 4, "box.png");
	//game.boards[0].slideTo(player1, "down", 10);
	var a = ["left", "right", "right", "down", "right", "down", "down", "down"];
	game.boards[0].routeTo(player1, a, 10);
	
});