// Consider it a namespace. Dougy Crockford says this is a good idea, because global variables are evil.
var CFOUR = {
    socket: io.connect('http://192.168.1.84:8888'),

    // How many bangin' cells to slip onto the bitchin' grid
    SIZE: {
        w: 10,
        h: 10
    },

    // How many mofo pixels to slam in each shizznit cell
    CELL_SIZE: {
        w: 40,
        h: 40
    },

    grid: [],

    TYPES: {
        nothing: 0,
        red: 1,
        blue: 2
    },

    // Functions takes pixel coords and outputs grid coords
    getGridCoords: function(x, y) {
        var xCoord = Math.floor(x / CFOUR.CELL_SIZE.w),
        yCoord = Math.floor(y / CFOUR.CELL_SIZE.h);

        return {
            x: xCoord,
            y: yCoord
        };
    },
    
    // Returns coords where the clicked squre would fall to 
    fall: function(pos) {
        for(var y = 0; y <= this.grid[pos.x].length; y++) {
            if((this.grid[pos.x][y] !== this.TYPES.nothing) || (typeof this.grid[pos.x][y] === 'undefined')) {
                return pos = {
                    x: pos.x,
                    y: (y - 1)
                };
            }
        }
    },

    registerHit: function(client, pos) {
        // Figure out which box to change
        pos = this.fall(pos);

        //console.log(this.fall(pos));
        if(client.type === "red") {
            this.grid[pos.x][pos.y] = this.TYPES.red;
        } else if(client.type === "blue") {
            this.grid[pos.x][pos.y] = this.TYPES.blue;
        }
    },

    isWinner: function() {
        for(var x = 0; x < this.SIZE.w; x++) {
            for(var y = 0; y < this.SIZE.h; y++) {
                // horizontal
                if(typeof this.grid[x + 3] !== 'undefined') {
                    if(this.grid[x][y] &&
                       this.grid[x + 1][y] === this.grid[x][y] &&
                       this.grid[x + 2][y] === this.grid[x][y] &&
                       this.grid[x + 3][y] === this.grid[x][y]) {
                           return true;
                       }
                }
                
                // Vetical
                if(typeof this.grid[x][y + 3] !== 'undefined') {
                    if(this.grid[x][y] &&
                       this.grid[x][y + 1] === this.grid[x][y]  &&
                       this.grid[x][y + 2] === this.grid[x][y] &&
                       this.grid[x][y + 3] === this.grid[x][y]) {
                           return true;
                       }
                }
            }
        }
    }
};

// Pump up the grid with fresh cells
for(var x = 0; x < CFOUR.SIZE.w; x++) {
    CFOUR.grid[x] = [];

    for(var y = 0; y < CFOUR.SIZE.h; y++) {
        CFOUR.grid[x][y] = CFOUR.TYPES.nothing;
    }
};
