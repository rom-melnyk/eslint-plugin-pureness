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

function stripPretty(bigString, smallString) {
    var smallStartsAt = bigString.indexOf(smallString);
    var head = smallStartsAt > 3 ? '...' : '';
    var tail = smallStartsAt + smallString.length < bigString.length - 3 ? '...' : '';

    return (head ? head : bigString.substring(0, smallStartsAt)) +
        smallString +
        (tail ? tail : bigString.substring(smallStartsAt + smallString.length));
}
