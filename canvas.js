let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 3 - 250;
canvas.height = window.innerHeight - 3;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let c = canvas.getContext("2d");
let background = "#373A40";
c.fillStyle = background;
c.fillRect(0, 0, innerWidth, innerHeight);

const vel1 = document.getElementById("vel1");
const vel2 = document.getElementById("vel2");

const x_pos = WIDTH / 2;
const y_pos = 360;
let r1;
let r2;
let m1;
let m2;
let a1_vel = document.getElementById("vel1").value / 1000;
let a2_vel = document.getElementById("vel2").value / 1000;
let a1 = Math.PI / 4;
let a2 = Math.PI / 8;
let coords = [];
let g = 0.98;

function drawCircle(x, y, r, clr) {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.fillStyle = clr;
  c.fill();
}
function drawLine(x1, y1, x2, y2, width, clr) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.lineWidth = width;
  c.strokeStyle = clr;
  c.stroke();
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = background;
  c.fillRect(0, 0, innerWidth, innerHeight);

  vel1.addEventListener("change", (e) => {
    a1_vel = e.target.value / 1000;
  });
  vel2.addEventListener("change", (e) => {
    a2_vel = e.target.value / 1000;
  });

  r1 = document.getElementById("len1").value;
  r2 = document.getElementById("len2").value;
  m1 = document.getElementById("rad1").value;
  m2 = document.getElementById("rad2").value;
  // a1_vel = document.getElementById("vel1").value / 100;
  // a2_vel = document.getElementById("vel2").value / 100;

  let x1 = r1 * Math.sin(a1) + x_pos;
  let y1 = r1 * Math.cos(a1) + y_pos;

  let x2 = r2 * Math.sin(a2) + x1;
  let y2 = r2 * Math.cos(a2) + y1;

  coords.push([x2, y2]);

  drawLine(x_pos, y_pos, x1, y1, 2, "#C73659");
  drawCircle(x1, y1, m1, "#A91D3A");
  drawLine(x1, y1, x2, y2, 2, "#7E8EF1");
  drawCircle(x2, y2, m2, "#615EFC");

  let num1 = -g * (2 * m1 * m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_vel ** 2 * r2 + a1_vel ** 2 * r1 * Math.cos(a1 - a2);
  let denum = 2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2);

  let a1_acc = (num1 + num2 + num3 * num4) / (r1 * denum);

  num1 = 2 * Math.sin(a1 - a2);
  num2 = a1_vel ** 2 * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * Math.cos(a1);
  num4 = a1_vel ** 2 * r2 * m2 * Math.cos(a1 - a2);

  let a2_acc = (num1 * (num2 + num3 + num4)) / (r2 * denum);

  a1_vel += a1_acc;
  a2_vel += a2_acc;
  a1 += a1_vel;
  a2 += a2_vel;

  for (let i = 0; i < coords.length - 1; i++) {
    drawLine(
      coords[i + 1][0],
      coords[i + 1][1],
      coords[i][0],
      coords[i][1],
      2,
      "#C0C7B4"
    );
  }
}

animate();
