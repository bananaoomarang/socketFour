$(document).ready(init);

function init() {
    CONNECT_FOUR.canvas = document.getElementById('theGrid');

    // Pump up the grid with fresh cells
    for(var x = 0; x < CONNECT_FOUR.SIZE.w; x++) {
        CONNECT_FOUR.GRID[x] = [];

        for(var y = 0; y < CONNECT_FOUR.SIZE.h; y++) {
            CONNECT_FOUR.GRID[x][y] = new CONNECT_FOUR.Square(CONNECT_FOUR.CELL_SIZE);
        }
}

    main();
}


function draw() {
    var ctx = CONNECT_FOUR.canvas.getContext('2d');

    ctx.lineWidth = 5
    for(var x = 0; x <= CONNECT_FOUR.GRID.length; x++) {
        ctx.beginPath();
        
        // figure out xPos to draw from in pixels
        var xPos = x * CONNECT_FOUR.CELL_SIZE.w;
        
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, CONNECT_FOUR.canvas.height);
        ctx.stroke();
        ctx.closePath();

        for(var y = 0; y <= CONNECT_FOUR.GRID[x].length; y++) {
            ctx.beginPath();
        
            // figure out yPos to draw from in pixels
            var yPos = y * CONNECT_FOUR.CELL_SIZE.h;
        
            ctx.moveTo(0, yPos);
            ctx.lineTo(CONNECT_FOUR.canvas.width, yPos);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function main() {

    draw();
}
