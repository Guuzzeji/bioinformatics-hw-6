// Score
const misMatchScore = -1;
const matchScore = 1;
const gapScore = -1;

// create empty matrix
export const createEmptyMatrix = function (arr2d, seq1, seq2) {
    for (let i = 0; i <= seq1.length; i++) {
        let row = [];
        for (let j = 0; j <= seq2.length; j++) {
            row[j] = 0;
        }
        arr2d[i] = row;
    }

    return arr2d;
};

// Set gapScore offset outer
export const createGapScoreOffset = function (arr2d, seq1, seq2) {
    // col
    for (let i = 0; i <= seq1.length; i++) {
        arr2d[i][0] = i * gapScore;
    }

    // row
    for (let i = 0; i <= seq2.length; i++) {
        arr2d[0][i] = i * gapScore;
    }

    return arr2d;
};

// Check if matchScore or mismatchScoreScore
function matchScoreCalc(seq1, seq2, i, j) {
    return (seq1[i] === seq2[j]) ? matchScore : misMatchScore;
}

// Calc matrix values
export const calcMatrixValues = function (arr2d, seq1, seq2) {
    for (let i = 1; i <= seq1.length; i++) {
        for (let j = 1; j <= seq2.length; j++) {
            let matchScoreScore = matchScoreCalc(seq1, seq2, i - 1, j - 1) + arr2d[i - 1][j - 1];;
            let up = arr2d[i - 1][j] + gapScore;
            let left = arr2d[i][j - 1] + gapScore;
            arr2d[i][j] = Math.max(matchScoreScore, up, left);
        }
    }
    return arr2d;
};

// Need to fix
// https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm
// https://www.youtube.com/watch?v=18vt6k-2Jbs
// http://rna.informatik.uni-freiburg.de/Teaching/index.jsp?toolName=Needleman-Wunsch 

// Track back from similarly score
export const trackBack = function (arr2d, seq1, seq2) {
    let seq1Align = "";
    let seq2Align = "";
    let i = seq1.length;
    let j = seq2.length;

    // Looping from bottom right corner
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && (arr2d[i][j] == arr2d[i - 1][j - 1] + matchScoreCalc(seq1, seq2, i - 1, j - 1))) {
            // When we have a matchScore value
            seq1Align = seq1[i - 1] + seq1Align;
            seq2Align = seq2[j - 1] + seq2Align;
            i--;
            j--;
            // When moving up
        } else if (i > 0 && arr2d[i][j] == arr2d[i - 1][j] + gapScore) {
            seq1Align = seq1[i - 1] + seq1Align;
            seq2Align = "-" + seq2Align;
            i--;
        } else {
            // When moving left
            seq1Align = "-" + seq1Align;
            seq2Align = seq2[j - 1] + seq2Align;
            j--;
        }
    }

    return {
        sequence1: seq1Align,
        sequence2: seq2Align,
    };
};