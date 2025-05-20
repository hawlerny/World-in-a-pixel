window.onload = () => {
  const canvas = document.getElementById("backgroundCanvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  let cols = 70;
  let rows = 65;
  let mesh = [];
  let t = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initMesh();
  }

  function initMesh() {
    mesh = [];
    for (let y = 0; y <= rows; y++) {
      let row = [];
      for (let x = 0; x <= cols; x++) {
        row.push({ x, y });
      }
      mesh.push(row);
    }
  }

  function drawMesh() {
    ctx.clearRect(0, 0, width, height);

    const spacingX = width / cols;
    const spacingY = height / rows;

    ctx.strokeStyle = "#0f0";                              "FAIRE CHANGEMENTS ICI POU TAILLE LIGNES(0.25 ou 0.7?"
    ctx.lineWidth = 0.25;                              

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let p1 = mesh[y][x];
        let p2 = mesh[y][x + 1];
        let p3 = mesh[y + 1][x];

        const pulse = Math.sin((t / 10) + x * 0.5 + y * 0.7);
        const heightOffset = Math.sin((t / 20) + x * 0.2) * 20;

        const x1 = p1.x * spacingX;
        const y1 = p1.y * spacingY + pulse * 9 + heightOffset;

        const x2 = p2.x * spacingX;
        const y2 = p2.y * spacingY + Math.sin((t / 10) + (x + 1) * 0.5 + y * 0.7) * 10;

        const x3 = p3.x * spacingX;
        const y3 = p3.y * spacingY + Math.sin((t / 10) + x * 0.5 + (y + 1) * 0.7) * 10;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x3, y3);
        ctx.stroke();
      }
    }
  }

  function animate() {
    t += 0.4;
    drawMesh();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  resize();
  animate();
};
