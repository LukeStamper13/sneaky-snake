//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */ //@ts-ignore canvas is an HTMLCanvasElement
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let game = {
	gridSize: 20,
	refreshRate: 500, // Milliseconds
};

class Cobra {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = game.gridSize;
		this.segments = [];
	}
}

class segment {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 */
	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = game.gridSize;
		this.segments = [];
		this.color = color;
	}

	update() {}

	draw() {}
}
