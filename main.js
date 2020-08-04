/**
 * @description Before trying to code it in Java I'm doing it in this
 * @author LeviDuncanPixel
 * @package io.github.leviduncanpixel.clock-on-canvas
 * @description JS had problems so here's an empty class
 */
class Clock {}

const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

function drawBG() {
	context.fillStyle = "#000";
	context.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i <= 360; i += 5) {
		var vector;
		if (i % 90 == 0) {
			vector = Vector.makeDistantVector(
				i,
				canvas.height * 0.25 * 0.75,
				canvas.height * 0.25 * 0.5
			);
		} else if (i % 30 == 0) {
			vector = Vector.makeDistantVector(
				i,
				canvas.height * 0.25 * 1,
				canvas.height * 0.25 * 0.25
			);
		} else if (i % 6 == 0) {
			vector = Vector.makeDistantVector(
				i,
				canvas.height * 0.25 * 1.125,
				canvas.height * 0.25 * 0.125
			);
		}
		vector.draw("#777");
	}
}

// canvas.width = canvas.width;
// canvas.height = canvas.height;

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

	getStart() {
		return this.start;
	}

	getEnd() {
		return this.end;
	}

	/**
	 * @description Returns the length of the vector / line
	 * @returns {Number}
	 */
	getLength() {
		return length;
	}

	/**
	 * @description Since JS cannot have overloaded constructors there's this abomination
	 * @param {Number} [rotDegrees=0] How many degrees from strictly vertical is the vector, counts from the 0/12 position of a clock clockwise
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
	 * @description Constructs a vector of [length] a [distance] away from [start]
	 * @param {Number} [rotDegrees=0] How many degrees from strictly vertical is the vector, counts from the 0/12 position of a clock clockwise
	 * @param {Number} [distance=length] The distance to the start of the new vector from the [start]
	 * @param {Number} length The length of the new vector
	 * @param {Point} [start=Point.centerPoint] The point through which the vector would go through
	 * @returns {Vector}
	 */
	static makeDistantVector(rotDegrees, distance, length, start) {
		if (rotDegrees == null || rotDegrees == undefined) {
			rotDegrees = 0;
		}

		if (start == null || start == undefined) {
			start = Point.centerPoint;
		}

		if (distance == null || distance == undefined) {
			distance = length;
		}

		const helperVector = Vector.makeVector(rotDegrees, distance, start);
		const startPoint = helperVector.getEnd();

		return Vector.makeVector(rotDegrees, length, startPoint);
	}

	/**
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
// minRot = 1;
// undo = true;
// hourRot = 0;

setInterval(() => {
	drawBG();

	Vector.makeVector(
		secFrame / 10,
		canvas.height * 0.25,
		Point.centerPoint
	).draw("#00CCFF");

	Vector.makeVector(
		secFrame / 600,
		canvas.height * 0.25 * 0.75,
		Point.centerPoint
	).draw("#CCFF00");

	Vector.makeVector(
		secFrame / 7200,
		canvas.height * 0.25 * 0.5,
		Point.centerPoint
	).draw("#FF00CC");

	secFrame += 1;

	// if (secFrame % 3600 == 0) {
	// 	secFrame = 0;
	// }

	// if (secFrame % 60 == 0 || secFrame % 60 == 1) {
	// 	if (undo == true) {
	// 		minRot--;
	// 		undo = false;
	// 	}
	// 	minRot += 6;
	// }

	// if (minRot % 3600 == 0) {
	// 	hourRot += 6;
	// }
}, 1000 / 57);
