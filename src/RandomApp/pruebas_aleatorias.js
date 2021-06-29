"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.serial = exports.kolmogorov = exports.chiCuadrada = void 0;
var tables_1 = require("./modules/tables");
var utils_1 = require("./utils");
function chiCuadrada(randoms, intervals, alpha) {
    randoms = utils_1.utils.sortNums(randoms);
    var frecEsp = randoms.length / intervals;
    var gradosLib = intervals - 1;
    var distribution = [];
    var _loop_1 = function (i) {
        distribution.push(randoms.filter(function (num) { return num < i / intervals && num >= (i - 1) / intervals; }));
    };
    for (var i = 1; i <= intervals; i++) {
        _loop_1(i);
    }
    // (FO-FE)²/FE
    var estadisticoMuestral = distribution.map(function (dist) {
        return Math.pow((dist.length - frecEsp), 2) / frecEsp;
    }).reduce(function (acc, num) { return acc + num; });
    var tableValue = tables_1.tables.chi[alpha][gradosLib];
    var testResult = tables_1.tables.chi[alpha][gradosLib] > estadisticoMuestral;
    return {
        randoms: randoms,
        intervals: intervals,
        alpha: alpha,
        frecEsp: frecEsp,
        gradosLib: gradosLib,
        distribution: distribution,
        estadisticoMuestral: estadisticoMuestral,
        tableValue: tableValue,
        testResult: testResult
    };
}
exports.chiCuadrada = chiCuadrada;
function kolmogorov(randoms, alpha) {
    randoms = utils_1.utils.sortNums(randoms);
    var n = randoms.length;
    var results = randoms.map(function (num, index) {
        return Math.abs((index + 1) / n - num);
    });
    var max = results.reduce(function (largest, num) { return largest < num ? num : largest; });
    var tableValue = tables_1.tables.kolmogorov[alpha][n];
    var testResult = max < tableValue;
    return {
        n: n,
        results: results,
        max: max,
        testResult: testResult,
        randoms: randoms,
        alpha: alpha,
        tableValue: tableValue
    };
}
exports.kolmogorov = kolmogorov;
function chi(distribution) {
    var frecEsp = distribution.reduce(function (acc, num) { return acc + num; }) / distribution.length;
    // (FO-FE)²/FE
    console.log(frecEsp);
    var chi = distribution.map(function (frecObs) {
        return Math.pow((frecObs - frecEsp), 2) / frecEsp;
    });
    var estadisticoMuestral = chi.reduce(function (acc, num) { return acc + num; });
    var result = chi.reduce(function (acc, num) { return acc + num; });
    return {
        frecEsp: frecEsp,
        frecObs: distribution,
        chi: chi,
        estadisticoMuestral: estadisticoMuestral
    };
}
function serial(randoms, alpha) {
    var resultsChi = chi(__spreadArray([], randoms));
    var randMatrix = utils_1.utils.parseMatrix(__spreadArray([], randoms));
    console.log("Parejas: " + randMatrix.couples + "     Frec Esperada: " + randMatrix.expected + "\nN=" + randMatrix.total + " K=" + randMatrix.k);
    console.log("Estad\u00EDstico Muestral= " + resultsChi.estadisticoMuestral);
    console.log("------ Resultado ------");
    var tableValue = tables_1.tables.chi[alpha][randoms.length - 1];
    var testResult = tableValue > resultsChi.estadisticoMuestral;
    return ({
        chi: resultsChi,
        matrix: randMatrix,
        tableValue: tableValue,
        alpha: alpha,
        testResult: testResult
    });
}
exports.serial = serial;
