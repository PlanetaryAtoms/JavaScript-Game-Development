var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min, max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}

function Ball(x_coor, y_coor, velX, velY, color, size) {
	this.x_coor = x_coor;
	this.y_coor = y_coor;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
} 

Ball.prototype.draw = function() {
	context.beginPath();
	context.fillStyle = this.color;
	context.arc(this.x_coor, this.y_coor, this.size, 0, 2 * Math.PI);
	context.fill();
};

Ball.prototype.update = function() {
	//Checking to see whether the x coordinate is greater than
	//the width of the canvas (the ball is going off the right hand edge).
	if ((this.x_coor + this.size) >= width) {
		this.velX = -(this.velX);
	}
	//Checking to see whether the x coordinate is smaller than
	//0 (the ball is going off the left hand edge).
	if((this.x_coor - this.size) <= 0) {
		this.velX = -(this.velX);
	}
	//Checking to see whether the y coordinate is greater than 
	//the height of the canvas (the ball is going off the bottom edge).
	if ((this.y_coor + this.size) >= height) {
		this.velY = -(this.velY);
	}
	//Checking to see whether the y coordinate is smaller than
	// 0 (the ball is going off the top edge).
	if ((this.y_coor - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	//The last two lines add the velX value to the x coordinate,
	// and the velY value to the y coordinate — the ball is in effect
	// moved each time this method is called.
	this.x_coor += this.velX;
	this.y_coor += this.velY;
};

//Immediately inside our for loop, we use an if statement to check whether the current ball
//being looped through is the same ball as the one we are currently checking.
//We don't want to check whether a ball has collided with itself! 
//To do this, we check whether the current ball 
//(i.e., the ball whose collisionDetect method is being invoked) is the same as the loop ball
//(i.e., the ball that is being referred to by the current iteration of the for loop
//in the collisionDetect method). We then use ! to negate the check, so that the code
//inside the if statement only runs if they are not the same.
Ball.prototype.collisionDetection = function() {
	for (var j = 0; j <balls.length; j++) {
		if (!(this ===  balls[j])) {
			var dx = this.x_coor - balls[j].x_coor;
			var dy = this.y_coor - balls[j].y_coor;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				balls[j].color = this.color = 'rgb(' + random(0, 255)
				 + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
};

var balls = [];

function aniLoop() {
	context.fillStyle = 'rgba(0, 0, 0, 0.25)';
	context.fillRect(0, 0, width, height);

	while(balls.length < 25) {
		var ball = new Ball(
			random(0, width),
			random(0,height),
			random(-7,7),
			random(-7,7),
			'rgb(' + random(0, 255) + ' , '
			+ random(0, 255) + ' , ' + 
			random(0, 255) + ')',
			random(10, 20)
			);
		balls.push(ball);
	}

	for(var i = 0; i <balls.length; i++) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetection();
	}

	requestAnimationFrame(aniLoop);
}

aniLoop();