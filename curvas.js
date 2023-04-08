const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

let elCanvas;

const sketch = ({ canvas }) => {
  const points = [
    new Point({ x: 200, y: 540 }),
    new Point({ x: 400, y: 700, control: true }),
    new Point({ x: 880, y: 540 }),
  ];

  canvas.addEventListener("mousedown", onmousedown);

  elCanvas = canvas;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    context.quadraticCurveTo(
      points[1].x,
      points[1].y,
      points[2].x,
      points[2].y
    );
    context.stroke();
    points.forEach((point) => {
      point.draw(context);
    });
  };
};

const onmousedown = (e) => {
    window.addEventListener("mousemove", onmousemove);
    window.addEventListener("mouseup", onmouseup); 
};

const onmousemove = (e) => {
    console.log(e.offsetX, e.offsetY);
}

const onmouseup = (e) => {
    window.removeEventListener("mousemove", onmousemove);
    window.removetListener("mouseup", onmouseup);
}

canvasSketch(sketch, settings);

class Point {
  constructor({ x, y, control = false }) {
    this.x = x;
    this.y = y;
    this.control = control;
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.control ? "red" : "black";

    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}
