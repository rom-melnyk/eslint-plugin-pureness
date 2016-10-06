/**
 * @fileoverview NewExpression analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;

// List of constructor names that are pure if used with params but unpure if used without ones.
// E.g., `new Date()` is unpure but `new Date(1469467369587)` is pure.
// Case matters, that's JS :)
var pureIfWithParams = [ 'Date' ];
var MESSAGE = '"{{0}}" makes the method unpure';

module.exports = function(context) {
    return function (node) {
        var ctorName = node.callee && node.callee.name;
        if (
            ctorName && pureIfWithParams.indexOf(ctorName) !== -1 &&
            node.arguments && node.arguments.length > 0
        ) {
            return;
        }
        context.report({
            node: node,
            message: MESSAGE,
            data: [ getCtorString(context, node) ]
        });
    };
};

// -------------- private methods --------------
var MASK_NEW_CTOR = /^new .*?\(/;

function getCtorString(context, node) {
    var text = getCode(context, node);
    var strippedText = MASK_NEW_CTOR.exec(text);

    return strippedText ? strippedText[0] + ')' : 'new <Constructor>()';
}
