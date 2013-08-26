// Consider it a namespace. Dougy Crockford says this is a good idea, because global variables are evil.
var CONNECT_FOUR = {
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

    GRID: [],

    socket: io.connect('http://192.168.0.22:8888'),
};
