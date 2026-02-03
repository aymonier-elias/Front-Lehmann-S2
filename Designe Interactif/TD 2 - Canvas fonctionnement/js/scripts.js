const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let position = 1;
let size = 0;
let W, H;
tailCanvas();
let red = 0;


window.requestAnimationFrame(affichage);
window.addEventListener("resize", tailCanvas);

function tailCanvas(params) {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
}

function affichage() {
    size += 100;
    red += 1;
    ctx.clearRect(0,0, W, H);
    ctx.fillStyle = "rgb("+red+",0,0)";
    ctx.fillRect((W/2)-(size/2),(H/2)-(size/2), size, size);
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.fillRect(40, 40, 100, 100);

    ctx.beginPath()
    ctx.moveTo(100, 500)
    ctx.lineTo(150, 300)
    ctx.moveTo(150, 300)
    ctx.lineTo(200, 400)
    ctx.moveTo(200, 400)
    ctx.lineTo(250, 300)
    ctx.moveTo(250, 300)
    ctx.lineTo(300, 500)

    ctx.moveTo(100 + 250, 500)
    ctx.lineTo(150 + 250, 300)
    ctx.moveTo(150 + 250, 300)
    ctx.lineTo(200 + 250, 400)
    ctx.moveTo(200 + 250, 400)
    ctx.lineTo(250 + 250, 300)
    ctx.moveTo(250 + 250, 300)
    ctx.lineTo(300 + 250, 500)

    ctx.moveTo(250 + 350, 300)
    ctx.lineTo(250 + 350, 500)

    ctx.stroke()

    ctx.lineWidth = 10;

    window.requestAnimationFrame(affichage);
}
