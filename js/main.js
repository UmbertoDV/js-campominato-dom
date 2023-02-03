//    _____ _       _           _  __      __        _       _     _
//   / ____| |     | |         | | \ \    / /       (_)     | |   | |
//  | |  __| | ___ | |__   __ _| |  \ \  / /_ _ _ __ _  __ _| |__ | | ___  ___
//  | | |_ | |/ _ \| '_ \ / _` | |   \ \/ / _` | '__| |/ _` | '_ \| |/ _ \/ __|
//  | |__| | | (_) | |_) | (_| | |    \  / (_| | |  | | (_| | |_) | |  __/\__ \
//   \_____|_|\___/|_.__/ \__,_|_|     \/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/

("use strict");
const startGameButton = document.getElementById("start-button");
const selectDifficoltà = document.getElementById("difficulty");
let bombe;

//    _____          _         ____          _                     _
//   / ____|        | |       / __ \        | |                   | |
//  | |     ___   __| | ___  | |  | |_ __   | |     ___   __ _  __| |
//  | |    / _ \ / _` |/ _ \ | |  | | '_ \  | |    / _ \ / _` |/ _` |
//  | |___| (_) | (_| |  __/ | |__| | | | | | |___| (_) | (_| | (_| |
//   \_____\___/ \__,_|\___|  \____/|_| |_| |______\___/ \__,_|\__,_|

startGameButton.addEventListener("click", function () {
	const grigliaEl = document.querySelector(".blocco-grande");
	const difficoltà = parseInt(selectDifficoltà.value);

	generaGriglia(grigliaEl, difficoltà);
});

//   ______                _   _
//  |  ____|              | | (_)
//  | |__ _   _ _ __   ___| |_ _  ___  _ __  ___
//  |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
//  | |  | |_| | | | | (__| |_| | (_) | | | \__ \
//  |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/

/**
 * genera una griglia dinamica per il gioco campominato dato l'elemento in cui inserirla
 *
 *  @param {HTMLElement} grid
 */
function generaGriglia(grid, difficoltà) {
	grid.innerHTML = "";
	for (let i = 0; i < difficoltà; i++) {
		const testoCella = i + 1;
		const cellaEl = generaBloccoPiccolo(testoCella, difficoltà);
		grid.append(cellaEl);
	}

	bombe = generaBombe(1, difficoltà);
	console.log(bombe);
}

/**
 * genera una cella dinamica per il gioco campominato e ritorna la cella
 *
 * @param {string} testo
 * @return {HTMLElement}
 */
function generaBloccoPiccolo(testo, difficoltà) {
	const bloccoPiccolo = document.createElement("div");
	const activeSquares = document.querySelectorAll(".blocco-piccolo.active");

	if (difficoltà == 81) {
		bloccoPiccolo.classList.add("blocco-piccolo-medium");
	} else if (difficoltà == 49) {
		bloccoPiccolo.classList.add("blocco-piccolo-hard");
	} else {
		bloccoPiccolo.classList.add("blocco-piccolo");
	}

	// bloccoPiccolo.innerHTML = testo;
	bloccoPiccolo.setAttribute("data-index", testo);

	bloccoPiccolo.addEventListener("click", function () {
		const indexBloccoPiccolo = parseInt(this.getAttribute("data-index"));

		if (bombe.includes(indexBloccoPiccolo)) {
			this.classList.add("bomb");
			gameOver(activeSquares, false);
		} else {
			this.classList.add("active");
		}

		if (difficoltà - bombe.length == activeSquares.length) {
			gameOver(activeSquares, true);
		}
	});

	return bloccoPiccolo;
}

/**
 * Funzione che genere un numero random fra 2 valori (valori inclusi).
 *
 * @param {int} min il valore minimo del numero generato
 * @param {int} max il valore massimo del numero generato
 * @returns {int} numero randomico generato tra i valori minimo e massimo
 *
 */
function generaNumeroCasuale(min, max) {
	const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
	return randomNumber;
}

/**
 * Funzione che genera un array con 16 "bombe" (interi) in un range.
 *
 * @param {int} min
 * @param {int} max
 * @returns {int[]}
 *
 */
function generaBombe(min, max) {
	const arrayBombe = [];

	while (arrayBombe.length < 16) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
		if (!arrayBombe.includes(randomNumber)) {
			arrayBombe.push(randomNumber);
		}
	}

	return arrayBombe;
}

/**
 * Funzione termina il gioco.
 *
 */
function gameOver(blocchiAttivi, gameWon) {
	if (gameWon) {
		alert(`Hai VINTO con ${blocchiAttivi.length} punti`);
	} else {
		alert(`Hai PERSO con ${blocchiAttivi.length} punti`);
	}
}
