// Sudoku Logic //
import TinyQueue from 'tinyqueue';

function filterZeros(val) {
    return val > 0;
}

export const solvePuzzle = (arr) => {
    var solvedSinceLastScore = 0;
    var rescoreThreshold = 3;
    var failedResults = 0;

    var pq = scoreCells(arr);
    var value = {};
    var cellResult = [];
    while (pq.length) {
        // Solve for value
        value = pq.pop();
        cellResult = getPossibleCellValues(arr, value.x, value.y);
        if (cellResult.length === 1) {
            // We have a unique value, that is our answer
            arr[value.x + (value.y * 9)] = cellResult[0];
            ++solvedSinceLastScore;
            // console.log(`==== Solved for (${value.x},${value.y}) = ${cellResult[0]} --- solvedSinceLastScore: ${solvedSinceLastScore}`);
        } else {
            // Non-unique or zero results, rescore if we hit the threshold
            if (failedResults === rescoreThreshold) {
                // console.log("==== Failed 3x - rescoring");
                scoreCells(arr);
                solvedSinceLastScore = 0;
                failedResults = 0;
            }
            
            // Since we did not solve, put back into queue with lower score
            // so we can solve that cell later
            value.score /= 2;
            pq.push(value);
        }
    }
    
    // console.log(`PUZZLE ${arr}`);
    return arr;
};

// Scores cells to figure out what order to solve the Sudoku Puzzle
export const scoreCells = (arr) => {
    var pq = new TinyQueue(null, (a, b) => b.score - a.score);

    for (var x = 0; x < 9; ++x) {
        for (var y = 0; y < 9; ++y) {
            if (arr[x + (y * 9)] === 0) {
                // Unsolved, score cell
                pq.push({
                    x: x,
                    y: y,
                    score: getRowValues(arr, x, y).length + getColumnValues(arr, x, y).length + getSquareValues(arr, x, y).length
                });
            }
        }
    }

    return pq;
}

export const getRowValues = (arr, x, y) => {
    // arr is 1-dimention, (x,y) is mapped to (x + (9*y))
    return arr.slice(y * 9, ((y + 1) * 9)).filter(filterZeros);
}

export const getColumnValues = (arr, x, y) => {
    var newArr = [];
    for (var i = x; i < arr.length; i += 9) {
        newArr.push(arr[i]);
    }
    return newArr.filter(filterZeros);
}

// Returns the index to the 1-dimentional array denoting the
// top-left element of that section
function getTopLeftSection(x, y) {
    var sectionNumber = ((x / 3) | 0) + (((y / 3) | 0) * 3);
    switch (sectionNumber) {
        case 0:
            return 0;
        case 1:
            return 3;
        case 2:
            return 6;
        case 3:
            return 27;
        case 4:
            return 30;
        case 5:
            return 33;
        case 6:
            return 54;
        case 7:
            return 57;
        case 8:
            return 60;
    }
}

export const getSquareValues = (arr, x, y) => {
    // Separate the Sudoku board in 9, find the section (x,y) belongs to
    // by means of a lookup table to the top-left element of that section.
    // Once we have the section, we simply collect all values within.

    var offset = getTopLeftSection(x, y);
    var newArr = [];
    for (var i = offset; i < (offset + (3 * 9)); i += 9) {
        for (var j = i; j < (i + 3); ++j) {
            newArr.push(arr[j]);
        }
    }
    return newArr.filter(filterZeros);
}

// Given a specific array location, get the possible values
// for that cell. Posible cell values are values that are unique
// AND not in the row/col/square
export const getPossibleCellValues = (arr, x, y) => {
    const numSet = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // Retreive the set diff of row, col, square
    // ex. if set includes [1,2,3,4,5] set diff -> [6,7,8,9]
    var tmp = new Set(getRowValues(arr, x, y));
    var row = numSet.filter(t => !tmp.has(t));

    tmp = new Set(getColumnValues(arr, x, y));
    var col = new Set(numSet.filter(t => !tmp.has(t)));

    tmp = new Set(getSquareValues(arr, x, y));
    var sq = new Set(numSet.filter(t => !tmp.has(t)));

    // Perform set intersection to find out what possible values we have
    var result = row.filter(t => col.has(t));
    result = result.filter(t => sq.has(t));

    return Array.from(result);
}