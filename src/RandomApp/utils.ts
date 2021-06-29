interface Matrix {
    total: number;
    k: number;
    matrix: Array<Array<number>>;
    couples: number;
    expected: number;
}

export const utils = {
    parseAlpha,
    parseMatrix,
    parseNums,
    sortNums,
    filterRandoms
}


function parseNums (nums: string) : Array<number>{
    // Convertimos el string a un array de strings
    let stringArray = nums.split(",");
    // Convertimos el array de strings en array de números
    let parsedNums: Array<number> = stringArray.map(num => Number(num));
    return parsedNums;
}

function sortNums (nums: Array<number>) : Array<number>{
    return nums.sort((a,b) => a - b);
}

function parseMatrix (randoms : Array<number>) : Matrix {
    const k : number = Math.sqrt(randoms.length);
    const couples : number = randoms.reduce( (acc, num) => acc + num);
    const total : number = couples * 2;
    const matrix : Array<Array<number>> = []; 
    const expected : number = couples / (k ** 2);
    for (let i = 1; i <= k; i++) {
        matrix.push(randoms.splice(0, k));
    }


    return {
        matrix,
        total,
        couples,
        k,
        expected
    }
}

interface Matrix {
    total: number;
    k: number;
    matrix: Array<Array<number>>;
    couples: number;
    expected: number;
}

function filterRandoms (parsedNums : Array<number>) : Array<number>{
    // Retornamos los números entre (0;1)
    return parsedNums.filter( random => {
        if (random >= 0 && random < 1) {
            return random;
        }
    });
}

function parseAlpha (stringAlpha: string): number {
    let alpha: number = Number(stringAlpha);
    if (alpha > 1 && alpha < 100) {
        alpha = alpha / 100;
    }

    return alpha;
}