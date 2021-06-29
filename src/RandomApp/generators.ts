interface MiddleSquare {
    seed: number;
    length: number;
    ammount: number;
    randoms: Array<number>;
    normalized: Array<number>;
    first: number;
}

export function middleSquare (seed : number, length: number, ammount:number) : MiddleSquare{
    const randoms : Array<number> = [];
    const first : number = centralize(seed**2, length);
    randoms.push( first );
    
    for (let i = 1; i < ammount; i++) {
        randoms.push( centralize(randoms[i-1] ** 2, length) );
    }
    
    const normalized : Array<number> = randoms.map( rand => normalize(rand,length) );
    

    return {
        seed,
        length,
        ammount,
        randoms,
        normalized,
        first
    }
}

function normalize (num: number, length: number) : number{
    return num / (10 ** length);
}

function centralize (num: number, length: number) : number{
    let numString : string = num.toString();

    while (true) {
        if (numString.length - length < 0) {
            numString += "0";
            continue;
        }
        if ( (numString.length - length) % 2 !== 0 ) {
            numString += "0";
        } else {
            break;
        }
    }

    const begin = ((numString.length - length) / 2)
    const end = numString.length - begin;

    return Number(numString.slice(begin, end));
}

export function congruential (seed: number, a : number, b: number, m:number) : Congruential {
    const randoms : Array<number> = [seed];

    while (randoms.length < (m+1)) {
        const rand = (a * randoms[randoms.length - 1] + b) % m;
        console.log(rand, randoms[1]);
        randoms.push(rand);
        if (rand === seed){
            break;
        }
    }

    const period = randoms.length - 1;
    const maxPeriod = period === m;
    const normalized = randoms.map( rand => rand / m);

    return {
        randoms,
        normalized,
        maxPeriod,
        period,
        seed,
        a,
        b,
        m
    }
}

interface Congruential {
    randoms: Array<Number>;
    normalized: Array<Number>;
    period: number;
    seed: number;
    maxPeriod: boolean;
    a: number;
    b: number;
    m: number;
}
