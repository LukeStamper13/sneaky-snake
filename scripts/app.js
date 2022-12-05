//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */ //@ts-ignore canvas is an HTMLCanvasElement
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const MOVE_UP = "up";
const MOVE_DOWN = "down";
const MOVE_LEFT = "left";
const MOVE_RIGHT = "right";

let game = {
	gridSize: 20,
	refreshRate: 100, // Milliseconds
};

class Cobra {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {game} game
	 */
	constructor(x, y, ctx, game) {
		this.x = x;
		this.y = y;
		this.game = game;
		this.ctx = ctx;
		this.currentDirection = MOVE_RIGHT;
		this.head = new Segment(this.x, this.y, "lime", this.ctx);
		this.segments = [];

		this.lastUpdate = 0;
		this.wireUpEvents();
	}

	/**
	 * @param {number} elapsedTime
	 */
	update(elapsedTime) {
		this.lastUpdate += elapsedTime;

		if (this.lastUpdate < this.game.refreshRate) return;

		this.lastUpdate = 0;

		switch (this.currentDirection) {
			case "down":
				this.head.y += this.game.gridSize;
				break;
			case "up":
				this.head.y -= this.game.gridSize;
				break;
			case "right":
				this.head.x += this.game.gridSize;
				break;
			case "left":
				this.head.x -= this.game.gridSize;
				break;
		}
	}

	draw() {
		this.head.draw();
		this.segments.forEach((s) => {
			s.draw();
		});
	}

	wireUpEvents() {
		document.addEventListener("keydown", (e) => {
			console.log(e.code);

			switch (e.code) {
				case "ArrowUp":
					this.currentDirection = MOVE_UP;
					break;
				case "ArrowDown":
					this.currentDirection = MOVE_DOWN;
					break;
				case "ArrowRight":
					this.currentDirection = MOVE_RIGHT;
					break;
				case "ArrowLeft":
					this.currentDirection = MOVE_LEFT;
					break;
			}
		});
	}
}

class Segment {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {string} color
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(x, y, color, ctx) {
		this.x = x;
		this.y = y;
		this.w = game.gridSize;
		this.h = game.gridSize;
		this.segments = [];
		this.color = color;
		this.ctx = ctx;
	}

	update() {}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.w, this.h);
	}
}

let c1 = new Cobra(5 * game.gridSize, 5 * game.gridSize, ctx, game);

let currentTime = 0;

function gameLoop(timeStamp) {
	let elapsedTime = timeStamp - currentTime;
	currentTime = timeStamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	c1.update(elapsedTime);
	c1.draw();

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
