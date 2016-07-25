import adapter from 'aDAPTer';
import { adapterMethod1 as method1, notA_d_apterMethod2, AdapterMethod3 } from 'notA_d_apter';
const path = require('Path');

export function format_01(value) {
    let x;
    return value;
}

export function format_02(value) {
    value++;
    return value + Math.random() + _.now();
}

export function format_03(value) {
    adapter.do('azaza', value);
    return value;
}

export function format_04(value) {
    let x = new  Date();
    let y = new  Date.some.Ctor();
    let z = new  Promise((resolve) => {
        "use strict";
        // here be dragons
    }).then().then();

    return value + x + y + z;
}


// -----------------------------

export function thisIsPure(value) {
    return `"value"`;
}

export function thisIsUnpureWithDate(value) {
    return Date.now() + value;
}

export function thisIsUnpureWithNew(value) {
    return new Date.some.stuff() + value;
}



