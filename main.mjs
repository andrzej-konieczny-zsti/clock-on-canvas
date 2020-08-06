/**
 * @description Before trying to code it in Java I'm doing it in this
 * @author LeviDuncanPixel
 * @package io.github.leviduncanpixel.clock-on-canvas
 * @description JS had problems so here's an empty class
 */
export class Clock {
	/**
	 * @param {HTMLElement} canvas The CSS compliant selector of the canvas to draw thee clock
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		Point.remakeCenterPoint(canvas);
	}
	drawBG() {
		this.context.fillStyle = "#000";
		this.context.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i <= 360; i += 6) {
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
			vector.draw(this.context, "#777");
		}
	}

	start() {
		setInterval(() => {
			// window.onresize = () => {
			// 	canvas.width = canvas.clientWidth;
			// 	canvas.height = canvas.clientHeight;
			// 	Point.remakeCenterPoint();
			// };

			if (
				this.canvas.width != this.canvas.clientWidth ||
				this.canvas.height != this.canvas.clientHeight
			) {
				this.canvas.width = this.canvas.clientWidth;
				this.canvas.height = this.canvas.clientHeight;
				Point.remakeCenterPoint(this.canvas);
			}

			this.time = new Date();
			this.hours = this.time.getHours() % 12;
			this.minutes = this.time.getMinutes();
			this.seconds = this.time.getSeconds();
			this.milis = this.time.getMilliseconds();

			this.drawBG();

			// console.log(`${hours}:${minutes}:${seconds}:${milis}`);

			Vector.makeVector(
				this.seconds * 6 + this.milis / (1000 / 6),
				this.canvas.height * 0.25,
				Point.centerPoint
			).draw(this.context, "#00CCFF");

			Vector.makeVector(
				this.minutes * 6 + this.seconds / 10,
				this.canvas.height * 0.25 * 0.875,
				Point.centerPoint
			).draw(this.context, "#CCFF00");

			Vector.makeVector(
				this.hours * 30 + this.minutes / 2,
				this.canvas.height * 0.25 * 0.75,
				Point.centerPoint
			).draw(this.context, "#FF00CC");
		}, 1);
	}
}

export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static centerPoint = new Point(
		Math.round(canvas.width / 2),
		Math.round(canvas.height / 2)
	);

	/**
	 *
	 * @param {HTMLElement} canvas
	 */
	static remakeCenterPoint(canvas) {
		this.centerPoint = new Point(
			Math.round(canvas.width / 2),
			Math.round(canvas.height / 2)
		);
	}
}

export class Vector {
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
	draw(context, color) {
		context.strokeStyle = color;
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.end.x, this.end.y);
		context.stroke();
	}
}
