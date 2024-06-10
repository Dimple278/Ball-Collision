// Generates a random color
const getRandomColor = () => {
  const hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generates a random number between min and max
const genRand = (min = 0, max = 100) => {
  const diff = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * diff);
  return rand + min;
};

// Checks if two balls intersect
const ballIntersect = (x1, y1, r1, x2, y2, r2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance <= r1 + r2;
};

// Calculates collision vectors for two balls
// const calculateVector = (x1, y1, vx1, vy1, x2, y2, vx2, vy2) => {
//   const collisionVector = { x: x2 - x1, y: y2 - y1 };
//   const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//   const normalizedCollisionV = {
//     x: collisionVector.x / distance,
//     y: collisionVector.y / distance,
//   };
//   const relativeVelocityVector = { x: vx1 - vx2, y: vy1 - vy2 };
//   const speed =
//     relativeVelocityVector.x * normalizedCollisionV.x +
//     relativeVelocityVector.y * normalizedCollisionV.y;
//   return { speed, normalizedCollisionV };
// };

// Calculates collision vectors for two balls
const calculateVector = (x1, y1, vx1, vy1, x2, y2, vx2, vy2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const nx = dx / distance; //normalized collision vector
  const ny = dy / distance;

  const dvx = vx1 - vx2; //relative velocity
  const dvy = vy1 - vy2;

  const dotProduct = dvx * nx + dvy * ny;

  return { dotProduct, nx, ny };
};
