"use strict";
exports.__esModule = true;
exports.utils = void 0;
exports.utils = {
    parseAlpha: parseAlpha,
    parseMatrix: parseMatrix,
    parseNums: parseNums,
    sortNums: sortNums,
    filterRandoms: filterRandoms
};
function parseNums(nums) {
    // Convertimos el string a un array de strings
    var stringArray = nums.split(",");
    // Convertimos el array de strings en array de números
    var parsedNums = stringArray.map(function (num) { return Number(num); });
    return parsedNums;
}
function sortNums(nums) {
    return nums.sort(function (a, b) { return a - b; });
}
function parseMatrix(randoms) {
    var k = Math.sqrt(randoms.length);
    var couples = randoms.reduce(function (acc, num) { return acc + num; });
    var total = couples * 2;
    var matrix = [];
    var expected = couples / (Math.pow(k, 2));
    for (var i = 1; i <= k; i++) {
        matrix.push(randoms.splice(0, k));
    }
    return {
        matrix: matrix,
        total: total,
        couples: couples,
        k: k,
        expected: expected
    };
}
function filterRandoms(parsedNums) {
    // Retornamos los números entre (0;1)
    return parsedNums.filter(function (random) {
        if (random >= 0 && random < 1) {
            return random;
        }
    });
}
function parseAlpha(stringAlpha) {
    var alpha = Number(stringAlpha);
    if (alpha > 1 && alpha < 100) {
        alpha = alpha / 100;
    }
    return alpha;
}
