let canvas;
let context;

window.onload = () => {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  render();
};

let World = {
  light: {x: 500, y: 500},
  walls: [
    {x: 100, y: 100, width: 100, height: 100},
    {x: 500, y: 100, width: 100, height: 100},
    {x: 300, y: 600, width: 100, height: 100},
    {x: 800, y: 600, width: 100, height: 100},
  ],
};

function getAngle(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const {light, walls} = World;

  light.x = (light.x + 5) % canvas.width;

  walls.forEach(wall => {
    let points = [
      {
        start: {x: wall.x, y: wall.y},
        end: {},
      },
      {
        start: {x: wall.x + wall.width, y: wall.y},
        end: {},
      },
      {
        start: {x: wall.x + wall.width, y: wall.y + wall.height},
        end: {},
      },
      {
        start: {x: wall.x, y: wall.y + wall.height},
        end: {},
      },
    ];

    points.forEach(({start, end}) => {
      context.fillStyle = '#f00';
      context.fillRect(start.x - 3, start.y - 3, 6, 6);

      const angle = getAngle(start, World.light);
      end.x = start.x + Math.cos(angle) * -1000;
      end.y = start.y + Math.sin(angle) * -1000;
      context.fillRect(end.x - 3, end.y - 3, 6, 6);

      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    });

    let polygons = [
      [points[0].start, points[0].end, points[1].end, points[1].start],
      [points[2].end, points[1].end, points[1].start, points[2].start],
      [points[3].end, points[2].end, points[2].start, points[3].start],
      [points[3].end, points[0].end, points[0].start, points[3].start],
    ];

    context.fillStyle = '#aaa';
    polygons.forEach(ps => {
      context.beginPath();
      context.moveTo(ps[0].x, ps[0].y);
      ps.slice(1).forEach(p => {
        context.lineTo(p.x, p.y);
      });
      context.fill();
    });

    context.fillStyle = '#000';
    context.fillRect(wall.x, wall.y, wall.width, wall.height);
  });

  context.fillStyle = '#f0f';
  context.fillRect(light.x - 3, light.y - 3, 6, 6);

  requestAnimationFrame(render);
}

window.addEventListener('mousemove', event => {
  console.log(event.clientX, event.clientY);
});
