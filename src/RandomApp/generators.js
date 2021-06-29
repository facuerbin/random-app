"use strict";
exports.__esModule = true;
exports.congruential = exports.middleSquare = void 0;
function middleSquare(seed, length, ammount) {
    var randoms = [];
    var first = centralize(Math.pow(seed, 2), length);
    randoms.push(first);
    for (var i = 1; i < ammount; i++) {
        randoms.push(centralize(Math.pow(randoms[i - 1], 2), length));
    }
    var normalized = randoms.map(function (rand) { return normalize(rand, length); });
    return {
        seed: seed,
        length: length,
        ammount: ammount,
        randoms: randoms,
        normalized: normalized,
        first: first
    };
}
exports.middleSquare = middleSquare;
function normalize(num, length) {
    return num / (Math.pow(10, length));
}
function centralize(num, length) {
    var numString = num.toString();
    while (true) {
        if (numString.length - length < 0) {
            numString += "0";
            continue;
        }
        if ((numString.length - length) % 2 !== 0) {
            numString += "0";
        }
        else {
            break;
        }
    }
    var begin = ((numString.length - length) / 2);
    var end = numString.length - begin;
    return Number(numString.slice(begin, end));
}
function congruential(seed, a, b, m) {
    var randoms = [seed];
    while (randoms.length < (m + 1)) {
        var rand = (a * randoms[randoms.length - 1] + b) % m;
        console.log(rand, randoms[1]);
        randoms.push(rand);
        if (rand === seed) {
            break;
        }
    }
    var period = randoms.length - 1;
    var maxPeriod = period === m;
    var normalized = randoms.map(function (rand) { return rand / m; });
    return {
        randoms: randoms,
        normalized: normalized,
        maxPeriod: maxPeriod,
        period: period,
        seed: seed,
        a: a,
        b: b,
        m: m
    };
}
exports.congruential = congruential;
