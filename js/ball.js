class Ball {
  constructor(x, y, sx, sy, radius = 30, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.diameter = radius * 2;
    this.sx = sx;
    this.sy = sy;
    this.color = color;
    this.createElement();
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.style.width = `${this.diameter}px`;
    this.element.style.height = `${this.diameter}px`;
    this.element.style.backgroundColor = this.color;
    this.element.style.borderRadius = "50%";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    document.getElementById("box-container").appendChild(this.element);
  }

  move() {
    this.x += this.sx;
    this.y += this.sy;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    this.element.style.backgroundColor = this.color;
  }

  checkWallCollision(boxBoundary) {
    if (
      this.x <= boxBoundary.left ||
      this.x + this.diameter >= boxBoundary.width
    ) {
      this.sx *= -1;
    }
    if (
      this.y <= boxBoundary.top ||
      this.y + this.diameter >= boxBoundary.height
    ) {
      this.sy *= -1;
    }
  }

  detectBallCollision(otherBall) {
    const collision = ballIntersect(
      this.x + this.radius,
      this.y + this.radius,
      this.radius,
      otherBall.x + otherBall.radius,
      otherBall.y + otherBall.radius,
      otherBall.radius
    );

    if (collision) {
      const { dotProduct, nx, ny } = calculateVector(
        this.x + this.radius,
        this.y + this.radius,
        this.sx,
        this.sy,
        otherBall.x + otherBall.radius,
        otherBall.y + otherBall.radius,
        otherBall.sx,
        otherBall.sy
      );

      if (dotProduct > 0) {
        this.sx -= dotProduct * nx;
        this.sy -= dotProduct * ny;
        otherBall.sx += dotProduct * nx;
        otherBall.sy += dotProduct * ny;
      }
    }
  }
}

// If dotProduct is positive (meaning the balls are moving toward each other), it adjusts their velocities:
// The current ball (this) reduces its velocity (sx, sy) along the collision vector.
// The other ball (otherBall) increases its velocity along the collision vector.
