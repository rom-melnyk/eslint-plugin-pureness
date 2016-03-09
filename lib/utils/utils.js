"use strict";

module.exports = {
    isArray: isArray,
    isObject: isObject,
    treatAsArray: treatAsArray,
    concatUnique: concatUnique,
    stripPretty: stripPretty
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

function stripPretty(longString, mask) {
    var maskStartsAt = longString.toLowerCase().indexOf( mask.toLowerCase() );
    var maskEndsAt = maskStartsAt + mask.length;

    var prefix = maskStartsAt > 3 ? '...' : '';
    var suffix = maskEndsAt < longString.length - 3 ? '...' : '';

    return (prefix ? prefix : longString.substring(0, maskStartsAt)) +
        longString.substring(maskStartsAt, maskEndsAt) +
        (suffix ? suffix : longString.substring(maskEndsAt));
}
