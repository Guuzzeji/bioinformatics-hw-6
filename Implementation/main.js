import minimist from 'minimist';

import {
    createEmptyMatrix,
    createGapScoreOffset,
    calcMatrixValues,
    trackBack
} from './NeedlemanWunsch.js';

const argv = minimist(process.argv.slice(2));

// Print out matrix of alignment 
function printMatrixValues(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let value = (j == matrix[i].length - 1) ? matrix[i][j].toString() : (matrix[i][j] + ",");
            process.stdout.write(" " + value);
        }
        console.log();
    }
}

// Create main
function main() {
    // Matrix
    let matrix = [];

    // Sequences
    const sequence1 = argv["seq-1"];
    const sequence2 = argv["seq-2"];

    console.log("Alignment (sequence1, sequence2) --> ", sequence1, sequence2);

    matrix = createEmptyMatrix(matrix, sequence1, sequence2);
    matrix = createGapScoreOffset(matrix, sequence1, sequence2);
    matrix = calcMatrixValues(matrix, sequence1, sequence2);

    let result = trackBack(matrix, sequence1, sequence2);

    console.log("Matrix: ");
    printMatrixValues(matrix);

    console.log("Results: ");
    console.log(result);
}

main();