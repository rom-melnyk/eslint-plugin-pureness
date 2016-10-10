"use strict";

var treatAsArray = require('./utils').treatAsArray;

var ASTERISK_MASK = /\*/g;
var SLASH_MASK = /([\\\/])/g;

var paths = {};

module.exports = function (filename, masks) {
    filename = filename.toLowerCase();

    // TODO make the `.map(...)` pure
    return treatAsArray(masks)
        .map(function (mask) {
            mask  = (mask || '').toLowerCase();

            if (!mask && paths[mask] === undefined) {
                invalidateMask(arguments[0], mask);
            }

            if (paths[mask] !== undefined) {
                return mask;
            }

            var safeMask = mask
                .replace(ASTERISK_MASK, '.*')
                .replace(SLASH_MASK, '\\$1');

            // caching the file mask RegExps
            try {
                paths[mask] = new RegExp(safeMask, 'gi');
            } catch (e) {
                invalidateMask(arguments[0], mask);
            }

            return mask;
        })
        .some(function (mask) {
            return mask && paths[mask] && paths[mask].test(filename);
        });
};


function invalidateMask(originalMask, normalizedMask) {
    console.warn('The file mask "' + originalMask + '" is invalid; no files will be checked against it.');
    paths[normalizedMask] = false;
}