// Code adapted from my diamonds.py program here: https://inventwithpython.com/bigbookpython/project16.html

const process = require('process');

// Constants for settings:
const DELAY = 100;  // Pause after each row in milliseconds.
const WIDTH = process.stdout.columns - 1;  // Number of columns in output.
const MIN_SQUARE_SIZE = 1;
const MAX_SQUARE_SIZE = 7;
const CHANCE_OF_FILLED_SQUARE = 0.0;
const NUM_SQUARES_PER_ROW = 3;

const UP_DOWN_CHAR         = String.fromCharCode(9474);  // Character 9474 is '│'
const LEFT_RIGHT_CHAR      = String.fromCharCode(9472);  // Character 9472 is '─'
const DOWN_RIGHT_CHAR      = String.fromCharCode(9484);  // Character 9484 is '┌'
const DOWN_LEFT_CHAR       = String.fromCharCode(9488);  // Character 9488 is '┐'
const UP_RIGHT_CHAR        = String.fromCharCode(9492);  // Character 9492 is '└'
const UP_LEFT_CHAR         = String.fromCharCode(9496);  // Character 9496 is '┘'

const UP_DOWN_RIGHT_CHAR   = String.fromCharCode(9500);  // Character 9500 is '├'
const UP_DOWN_LEFT_CHAR    = String.fromCharCode(9508);  // Character 9508 is '┤'
const DOWN_LEFT_RIGHT_CHAR = String.fromCharCode(9516);  // Character 9516 is '┬'
const UP_LEFT_RIGHT_CHAR   = String.fromCharCode(9524);  // Character 9524 is '┴'
const CROSS_CHAR           = String.fromCharCode(9532);  // Character 9532 is '┼'


const EMPTY = '      ...,';  // The characters in this string are used to fill outside the squares.
const SQUARE_INTERIOR = ' ';  // The characters in this string are used to fill the square interiors.


function getOutlineSquare(size) {
    console.assert(size >= 0);
    
    let rows = [];
    // Make the top row of the square:
    rows.push(DOWN_RIGHT_CHAR + (LEFT_RIGHT_CHAR.repeat(size * 2)) + DOWN_LEFT_CHAR);

    // Make the middle segment of the square:
    for (let i = 0; i < size; i++) {
        rows.push(UP_DOWN_CHAR + SQUARE_INTERIOR.repeat(size * 2) + UP_DOWN_CHAR);
    }

    // Make the bottom row of the square:
    rows.push(UP_RIGHT_CHAR + (LEFT_RIGHT_CHAR.repeat(size * 2)) + UP_LEFT_CHAR);

    return rows;
}


function getFilledSquare(size) {
    console.assert(size >= 0);
    
    let rows = [];
    // Make the top row of the square:
    rows.push(DOWN_RIGHT_CHAR + (DOWN_LEFT_RIGHT_CHAR.repeat(size * 2)) + DOWN_LEFT_CHAR);

    // Make the middle segment of the square:
    for (let i = 0; i < size; i++) {
        rows.push(UP_DOWN_RIGHT_CHAR + (CROSS_CHAR.repeat(size * 2)) + UP_DOWN_LEFT_CHAR);
    }

    // Make the bottom row of the square:
    rows.push(UP_RIGHT_CHAR + (UP_LEFT_RIGHT_CHAR.repeat(size * 2)) + UP_LEFT_CHAR);

    return rows;
}

(async function displayDiamonds() {
let nextRows = [];
while (true) {
    for (let j = 0; j < NUM_SQUARES_PER_ROW; j++) {
        const size = Math.floor(Math.random() * (MAX_SQUARE_SIZE - MIN_SQUARE_SIZE + 1)) + MIN_SQUARE_SIZE;

        let square;
        if (Math.random() < CHANCE_OF_FILLED_SQUARE) {
            square = getFilledSquare(size);
        } else {
            square = getOutlineSquare(size);
        }

        const xStart = Math.floor(Math.random() * (WIDTH - 1 - (size * 2 + 2)));

        // Make sure there are enough rows in `nextRows`:
        if (nextRows.length < size * 2 + 2) {
            for (let k = 0; k < ((size * 2 + 2) - nextRows.length); k++) {
                nextRows.push(Array.from({length: WIDTH}, () => EMPTY[Math.floor(Math.random() * EMPTY.length)]));
            }
        }

        // Add the square to `nextRows`
        for (let y = 0; y < square.length; y++) {
            for (let x = 0; x < square[y].length; x++) {
                nextRows[y][x + xStart] = square[y][x];
            }
        }
    }

    // Print the row and then remove it:
    console.log(nextRows[0].join(''));
    nextRows.shift();

    // Pause for a bit before printing the next row:
    await new Promise(resolve => setTimeout(resolve, DELAY));
}
})();
