// --- forbidden-import ---
import adapter from 'aDAPTer';
import { adapterMethod1 as method1, notA_d_apterMethod2, AdapterMethod3 } from 'notA_d_apter';
const path = require('Path');


export function dummy(value) {
    // this is pure function
    let x;
    return value;
}


// --- forbidden-expression ---
export function forbiddenExpression_01(value) {
    value++;
    adapter.do('azaza', value);
    value = Date.now() + value;
    return value + Math.random() + _.now();
}


// --- forbid-new ---
export function forbidNew(value) {
    let x = new  Date(42); // this might be pure because with params
    let y = new  Date
        .some
        .Ctor('asdf   .123');
    let z = new  Promise((resolve) => { // this might be pure because Promise is listed as allowed
        "use strict";
        // here be dragons
    });

    value += x + y + z;
    return new Date.some.stuff() + value;
}
