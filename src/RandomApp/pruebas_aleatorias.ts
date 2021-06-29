import {tables} from "./modules/tables";
import { utils } from "./utils";

export function chiCuadrada( randoms: Array<number>, intervals: number, alpha: number): ChiCuadrada {
    randoms = utils.sortNums(randoms);
    const frecEsp : number = randoms.length / intervals;
    const gradosLib : number = intervals - 1;
    
    let distribution:Array<Array<number>> = [];
    for (let i = 1; i <= intervals; i++) {
        distribution.push( randoms.filter(num => num < i/intervals && num >= (i-1)/intervals ) );
    }


    // (FO-FE)²/FE
    let estadisticoMuestral = distribution.map(dist => {
        return (dist.length - frecEsp) ** 2 / frecEsp;
    }).reduce((acc, num) => acc + num);

    const tableValue : number = tables.chi[alpha][gradosLib];
    const testResult : boolean = tables.chi[alpha][gradosLib] > estadisticoMuestral;

    return {
        randoms,
        intervals,
        alpha,
        frecEsp,
        gradosLib,
        distribution,
        estadisticoMuestral,
        tableValue,
        testResult
    }
}

interface ChiCuadrada {
    randoms: Array<number>;
    intervals: number;
    alpha: number;
    frecEsp: number;
    gradosLib: number;
    distribution: Array<Array<number>>;
    estadisticoMuestral: number;
    tableValue: number;
    testResult: boolean;
}


export function kolmogorov (randoms : Array<number>, alpha: number): Kolmogorov {
    randoms = utils.sortNums(randoms);
    const n : number = randoms.length;
    const results : Array<number> = randoms.map( (num, index) => {
        return Math.abs( (index+1)/n - num );
    })

    const max : number = results.reduce( (largest, num) => largest <num ? num : largest );
    const tableValue : number = tables.kolmogorov[alpha][n];
    const testResult : boolean = max < tableValue; 

    return {
        n,
        results,
        max,
        testResult,
        randoms,
        alpha,
        tableValue
    }
}

interface Kolmogorov {
    n: number;
    randoms: Array<number>;
    results: Array<number>;
    max: number;
    testResult: boolean;
    alpha: number;
    tableValue: number;
}

function chi (distribution : Array<number>) : Chi{
    const frecEsp = distribution.reduce( (acc, num) => acc + num) / distribution.length;
    // (FO-FE)²/FE
    console.log(frecEsp)
    const chi : Array<number> = distribution.map(frecObs => {
        return (frecObs - frecEsp) ** 2 / frecEsp;
    })
    const estadisticoMuestral : number = chi.reduce((acc, num) => acc + num);
    const result = chi.reduce( (acc, num) => acc + num);
    return {
        frecEsp,
        frecObs : distribution,
        chi,
        estadisticoMuestral
    };
}

interface Chi {
    frecEsp: number;
    frecObs : Array<number>;
    chi : Array<number>;
    estadisticoMuestral : number;
}

export function serial (randoms : Array<number>, alpha : number): Serial {
    const resultsChi : Chi = chi([...randoms]);
    const randMatrix : Matrix = utils.parseMatrix([...randoms]);

    console.log(`Parejas: ${randMatrix.couples}     Frec Esperada: ${randMatrix.expected}\nN=${randMatrix.total} K=${randMatrix.k}`)
    console.log(`Estadístico Muestral= ${resultsChi.estadisticoMuestral}`)
    console.log("------ Resultado ------");
    const tableValue : number = tables.chi[alpha][randoms.length -1]; 
    const testResult : boolean = tableValue > resultsChi.estadisticoMuestral;
    return ({
        chi: resultsChi,
        matrix: randMatrix,
        tableValue,
        alpha,
        testResult
    });

}

interface Serial {
    chi: Chi;
    matrix: Matrix;
    tableValue: number;
    alpha: number;
    testResult: boolean;
}

interface Matrix {
    total: number;
    k: number;
    matrix: Array<Array<number>>;
    couples: number;
    expected: number;
}