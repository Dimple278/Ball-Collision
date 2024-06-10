let BALL_COUNT = 10;

const getRandomColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  var code = "#";
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * hex.length);
    code += hex[index];
  }
  return code;
};

function genRand(min = 0, max = 100) {
  let diff = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * diff);
  return rand + min;
}

function ballIntersect(x1, y1, r1, x2, y2, r2) {
  let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  return squareDistance <= (r1 + r2) * (r1 + r2);
}

function calculateVector(x1, y1, vx1, vy1, x2, y2, vx2, vy2) {
  let collisionVector = { x: x2 - x1, y: y2 - y1 };
  let distance = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  let normalizedCollisionV = {
    x: collisionVector.x / distance,
    y: collisionVector.y / distance,
  };
  let relativeVelocityVector = { x: vx1 - vx2, y: vy1 - vy2 };
  let speed =
    relativeVelocityVector.x * normalizedCollisionV.x +
    relativeVelocityVector.y * normalizedCollisionV.y;
  return {
    speed,
    normalizedCollisionV,
  };
}

const boxContainer = document.getElementById("box-container");
const boxBoundary = boxContainer.getBoundingClientRect();

class Ball {
  constructor(x, y, sx, sy, radius = 20, color) {
    this.x = x;
    this.y = y;
    this.diameter = 2 * radius;
    this.radius = radius;
    this.sx = sx;
    this.sy = sy;
    this.color = color;
    this.isColliding = false;
  }

  create() {
    this.element = document.createElement("div");
    this.element.style.borderRadius = "50%";
    this.element.style.width = this.diameter + "px";
    this.element.style.height = this.diameter + "px";
    this.element.style.position = "absolute";
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.backgroundColor = this.color;
    boxContainer.appendChild(this.element);
  }

  move() {
    this.x += this.sx;
    this.y += this.sy;
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.backgroundColor = this.color;
  }

  checkWallCollision() {
    if (this.x >= boxBoundary.width - this.diameter) {
      this.sx *= -1;
    }
    if (this.x <= boxBoundary.left) {
      this.sx *= -1;
    }
    if (this.y >= boxBoundary.height - this.diameter) {
      this.sy *= -1;
    }
    if (this.y <= boxBoundary.top) {
      this.sy *= -1;
    }
  }

  detectCollision(currentIndex) {
    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].isColliding = false;
    }
    for (let i = 0; i < ballArray.length; i++) {
      if (i === currentIndex) {
        break;
      } else {
        let object = ballArray[i];
        if (
          ballIntersect(
            this.x + this.radius,
            this.y + this.radius,
            this.radius,
            object.x + object.radius,
            object.y + object.radius,
            object.radius
          )
        ) {
          this.isColliding = true;
          object.isColliding = true;
          const { speed, normalizedCollisionV } = calculateVector(
            this.x + this.radius,
            this.y + this.radius,
            this.sx,
            this.sy,
            object.x + object.radius,
            object.y + object.radius,
            object.sx,
            object.sy
          );
          if (speed <= 0) {
            break;
          } else {
            this.sx -= speed * normalizedCollisionV.x;
            this.sy -= speed * normalizedCollisionV.y;
            object.sx += speed * normalizedCollisionV.x;
            object.sy += speed * normalizedCollisionV.y;
          }
        }
      }
    }
  }
}

let ballArray = [];
for (let i = 0; i < BALL_COUNT; i++) {
  const ball = new Ball(
    genRand(1, boxBoundary.width - 100),
    genRand(1, boxBoundary.height - 100),
    (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
    (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
    genRand(10, 40),
    getRandomColor()
  );
  ball.create();
  ballArray.push(ball);
}

function play() {
  window.requestAnimationFrame(() => {
    play();
    ballArray.map((ballElement) => {
      let currIndex = ballArray.indexOf(ballElement);
      ballElement.detectCollision(currIndex);
      ballElement.checkWallCollision();
      ballElement.move();
    });
  });
}
play();

const ballCount = document.querySelector(".ball-count");
boxContainer.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    const ball = new Ball(
      e.layerX,
      e.layerY,
      (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      genRand(10, 30),
      getRandomColor()
    );
    ball.create();
    ballArray.push(ball);
  }
  ballCount.innerHTML = ballArray.length + " Balls";
});
