const BALL_COUNT = 10;
const ballArray = [];
const boxContainer = document.getElementById("box-container");
const boxBoundary = boxContainer.getBoundingClientRect();

// Create initial balls
for (let i = 0; i < BALL_COUNT; i++) {
  const ball = new Ball(
    genRand(1, boxBoundary.width - 100),
    genRand(1, boxBoundary.height - 100),
    (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
    (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
    genRand(10, 30),
    getRandomColor()
  );
  ballArray.push(ball);
}

//Animation loop
function animate() {
  window.requestAnimationFrame(animate);
  ballArray.forEach((ball, index) => {
    ball.checkWallCollision(boxBoundary);
    for (let j = index + 1; j < ballArray.length; j++) {
      ball.detectBallCollision(ballArray[j]);
    }
    ball.move();
  });
}
animate();

// Add more balls on click
boxContainer.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    const ball = new Ball(
      e.layerX,
      e.layerY,
      (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      (Math.random() * 4 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      genRand(10, 30),
      getRandomColor()
    );
    ballArray.push(ball);
  }
  document.querySelector(".ballCount").innerHTML = `${ballArray.length} Balls`;
});
