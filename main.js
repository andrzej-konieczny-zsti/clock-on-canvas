/**
 * @description Before trying to code it in Java I'm doing it in this
 * @author LeviDuncanPixel
 */

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

function drawBG() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static centerPoint = new Point(
		Math.round(canvas.width / 2),
		Math.round(canvas.height / 2)
	);
}

class Vector {
	/**
	 * @param {Point} [start=Point.centerPoint] The start point of the vector / line
	 * @param {Point} [end=start] The end point of the vector / line
	 */
	constructor(start, end) {
		if (start == null) {
			this.start = Point.centerPoint;
		} else {
			this.start = start;
		}

		if (end == null) {
			this.end = this.start;
		} else {
			this.end = end;
		}

		this.length = Math.sqrt(
			((this.start.x - this.end.x) ^ 2) +
				((this.start.y - this.end.y) ^ 2)
		);
	}

	/**
	 * @description Returns the Point object of the middle of the vector
	 * @returns {Point}
	 */
	getMiddle() {
		midx = (this.start.x + this.end.x) / 2;
		midy = (this.start.y + this.end.y) / 2;
		return new Point(midx, midy);
	}

	/**
	 * @description Returns the length of the vector / line
	 * @returns {Number}
	 */
	getLength() {
		return length;
	}

	/**
	 * @description Since JS cannot have overriden constructors there's this abomination
	 * @param {Number} [rotDegrees=0] The amount of degrees the vector is from vertical to top (0)
	 * @param {Number} lenght The lenght of the vector
	 * @param {Point} [start=Point.centerPoint] The starting point of the vector
	 * @returns {Vector} A vector object
	 */
	static makeVector(rotDegrees, length, start) {
		if (rotDegrees == null || rotDegrees == undefined) {
			rotDegrees = 0;
		}
		if (start == null || start == undefined) {
			start = Point.centerPoint;
		}

		const rotRads = rotDegrees * (Math.PI / 180);

		var endX = start.x + length * Math.sin(rotRads);
		var endY = start.y - length * Math.cos(rotRads);

		const endPoint = new Point(endX, endY);

		return new Vector(start, endPoint);
	}

	/**
	 *
	 * @param {String} color A CSS compliant color string
	 */
	draw(color) {
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.end.x, this.end.y);
		context.stroke();
	}
}

secFrame = 0;
minRot = 1;
undo = true;
hourRot = 0;

setInterval(() => {
	drawBG();

	Vector.makeVector(
		secFrame / 10,
		canvas.height * 0.25,
		Point.centerPoint
	).draw("#00CCFF");

	Vector.makeVector(
		minRot / 100,
		canvas.height * 0.25 * 0.75,
		Point.centerPoint
	).draw("#CCFF00");

	Vector.makeVector(
		hourRot / 100,
		canvas.height * 0.25 * 0.5,
		Point.centerPoint
	).draw("#FF00CC");

	secFrame++;

	if (secFrame % 3600 == 0) {
		secFrame = 0;
	}

	if (secFrame % 60 == 0 || secFrame % 60 == 1) {
		if (undo == true) {
			minRot--;
			undo = false;
		}
		minRot += 6;
	}

	if (minRot % 3600 == 0) {
		hourRot += 6;
	}
}, 1000 / 60);
