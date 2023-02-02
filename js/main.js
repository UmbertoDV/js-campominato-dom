//    _____ _       _           _  __      __        _       _     _
//   / ____| |     | |         | | \ \    / /       (_)     | |   | |
//  | |  __| | ___ | |__   __ _| |  \ \  / /_ _ _ __ _  __ _| |__ | | ___  ___
//  | | |_ | |/ _ \| '_ \ / _` | |   \ \/ / _` | '__| |/ _` | '_ \| |/ _ \/ __|
//  | |__| | | (_) | |_) | (_| | |    \  / (_| | |  | | (_| | |_) | |  __/\__ \
//   \_____|_|\___/|_.__/ \__,_|_|     \/ \__,_|_|  |_|\__,_|_.__/|_|\___||___/

("use strict");
const startGameButton = document.getElementById("start-button");
const selectDifficoltà = document.getElementById("difficulty");
const dimensioneGriglia = 100;

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
}

/**
 * genera una cella dinamica per il gioco campominato e ritorna la cella
 *
 * @param {string} testo
 * @return {HTMLElement}
 */
function generaBloccoPiccolo(testo, difficoltà) {
	const bloccoPiccolo = document.createElement("div");
	if (difficoltà == 81) {
		bloccoPiccolo.classList.add("blocco-piccolo-medium");
	} else if (difficoltà == 49) {
		bloccoPiccolo.classList.add("blocco-piccolo-hard");
	} else {
		bloccoPiccolo.classList.add("blocco-piccolo");
	}
	bloccoPiccolo.innerHTML = testo;

	bloccoPiccolo.addEventListener("click", function () {
		console.log(testo);
		this.classList.toggle("active");
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
