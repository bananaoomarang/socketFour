$(document).ready(main);

function main() {
    CFOUR.canvas = document.getElementById('theGrid');

    // Set up some nangin' socket events for bitch ass crazy speed multiplayer
    CFOUR.socket.on('new grid hit', function(data) {
        CFOUR.registerHit(data.client, data.pos);
        draw();
    });
    
    CFOUR.socket.on('client connected', function(data) {
        var ip = "192.168.1.84"

        console.log(data);
        if(data === 1) {
            CFOUR.client = new Client(ip, "red");
        } else if(data === 2) {
            CFOUR.client = new Client(ip, "blue");
        } else if(data > 2) {
            CFOUR.client = new Client(ip);
        }

    });

    // Set up some bangin' JQuery events
    $('#theGrid').click(function(e) {
        var xPos = e.offsetX,
            yPos = e.offsetY;

        var hitPos = CFOUR.getGridCoords(xPos, yPos);
        CFOUR.socket.emit('grid hit', {
            client: CFOUR.client,
            pos: hitPos
        });
        CFOUR.registerHit(CFOUR.client, hitPos);

        draw();
    });

    draw();
}


function draw() {
    // Whack out some nizzy lines to set up the dizzy grid
    var ctx = CFOUR.canvas.getContext('2d');

    ctx.lineWidth = 5;

    ctx.clearRect(0, 0, CFOUR.canvas.width, CFOUR.canvas.height);
    
    // Iterate over grid again and put right colours in right place, redrawing accordingly
    for(var x = 0; x < CFOUR.grid.length; x++) {
        for(var y = 0; y < CFOUR.grid[x].length; y++) {
            var xPos = x * CFOUR.CELL_SIZE.w,
                yPos = y * CFOUR.CELL_SIZE.h;

            switch(CFOUR.grid[x][y]) {
                case CFOUR.TYPES.nothing:
                    // Proceed to do exactly that
                    break;
                case CFOUR.TYPES.red:
                    ctx.fillStyle="red";
                    ctx.fillRect(xPos, yPos, CFOUR.CELL_SIZE.w, CFOUR.CELL_SIZE.h);
                    break;
                case CFOUR.TYPES.blue:
                    ctx.fillStyle="blue";
                    ctx.fillRect(xPos, yPos, CFOUR.CELL_SIZE.w, CFOUR.CELL_SIZE.h);
                    break;
                default:
                    // I don't know what the poop just happened
                    break;
            }
        }
    }

    // TODO this still draws needlessly over the left and top edges making things look ugly
    for(var x = 0; x < CFOUR.grid.length; x++) {
        ctx.beginPath();
        
        // figure out xPos to draw from in pixels
        var xPos = x * CFOUR.CELL_SIZE.w;
        
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, CFOUR.canvas.height);
        ctx.stroke();
        ctx.closePath();

        for(var y = 0; y < CFOUR.grid[x].length; y++) {
            ctx.beginPath();
        
            // figure out yPos to draw from in pixels
            var yPos = y * CFOUR.CELL_SIZE.h;
        
            ctx.moveTo(0, yPos);
            ctx.lineTo(CFOUR.canvas.width, yPos);
            ctx.stroke();
            ctx.closePath();
        }
    }

}
