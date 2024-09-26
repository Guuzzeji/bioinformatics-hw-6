import minimist from 'minimist';

import {
    createEmptyMatrix,
    createGapScoreOffset,
    calcMatrixValues,
    trackBack
} from './NeedlemanWunsch.js';

const argv = minimist(process.argv.slice(2));

function printMatrixValues(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let value = (j == matrix[i].length - 1) ? matrix[i][j].toString() : (matrix[i][j] + ",");
            process.stdout.write(" " + value);
        }
        console.log();
    }
}

function main() {
    // Matrix
    let matrix = [];

    // Sequences
    const sequence1 = argv["seq-1"];
    const sequence2 = argv["seq-2"];

    matrix = createEmptyMatrix(matrix, sequence1, sequence2);
    matrix = createGapScoreOffset(matrix, sequence1, sequence2);
    matrix = calcMatrixValues(matrix, sequence1, sequence2);

    let result = trackBack(matrix, sequence1, sequence2);

    printMatrixValues(matrix);
    console.log(result);
}

main();