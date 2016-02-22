"use strict";

module.exports = {
    isArray: isArray,
    isObject: isObject,
    treatAsArray: treatAsArray,
    concatUnique: concatUnique
};

function _toString(obj) {
    return Object.prototype.toString.call(obj);
}

function isArray(obj) {
    return typeof obj === 'object' && _toString(obj) === '[object Array]';
}

function isObject(obj) {
    return typeof obj === 'object' && _toString(obj) === '[object Object]';
}

function treatAsArray(obj) {
    return isArray(obj) ? obj : [ obj ];
}

function concatUnique(dest, source) {
    treatAsArray(source).forEach(function (el) {
        if (dest.indexOf(el) === -1) {
            dest.push(el);
        }
    });
}
