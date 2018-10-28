// Ristinolla JS
// 2018-09-30
// Miikka Mättölä
// I have used numbers 1 for player 1, and 4 for player 2
// in order to mathematically calculate which player has won.
// Player 1 has won when the sum of three marks in a row is 3.
// Player 2 has won when the sum is 12 (4+4+4).
'use strict';

let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let winningSum = [3, 12];
let mark = ["X", "O"];
let numb = [1, 4];

function checkFreeSpace(space) {
	if (grid[space] == 0) {
		return 1;
	}
	else {
		return 0;
	}
}

function checkForTie(m) {
	for (let i = 0; i < 9; i++) {
		if (m[i] == 0) {
			return 0;
		}
	}

	return 1;
}

function checkForWin(m) {
	let currentRow = 0;
	for (let i = 0; i < 3; i++) {
		// horizontal rows
		currentRow = m[3*i] + m[3*i+1] + m[3*i+2];
		if (currentRow == winningSum[0]) {
			return 1;
		}
		else if (currentRow == winningSum[1]) {
			return 2;
		}
		// vertical rows
		currentRow = m[i] + m[i+3] + m[i+6];
		if (currentRow == winningSum[0]) {
			return 1;
		}
		else if (currentRow == winningSum[1]) {
			return 2;
		}
	}
	// diagonal rows
	currentRow = m[0] + m[4] + m[8];
	if (currentRow == winningSum[0]) {
		return 1;
	}
	else if (currentRow == winningSum[1]) {
		return 2;
	}
	currentRow = m[2] + m[4] + m[6];
	if (currentRow == winningSum[0]) {
		return 1;
	}
	else if (currentRow == winningSum[1]) {
		return 2;
	}

	return 0;
}

function userInput(space) {
	if (checkFreeSpace(space) == 1) {
		grid[space] = numb[turn];
		document.getElementById('s' + space).innerHTML = mark[turn];
		// check if the player won
		if (checkForWin(grid) > 0) {
			document.getElementById('noteheader').innerHTML = mark[turn] + " won!";
		}
		else if (checkForTie(grid) == 1) {
			document.getElementById('noteheader').innerHTML = "Tie!";
		}
		else {
			// change turn
			turn = Math.abs(turn - 1);
		}
	}
	else {
		console.log("space: " + space + " is taken!");
	}
}

// first turn player X
let turn = 0;
