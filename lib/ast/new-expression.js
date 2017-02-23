/**
 * @fileoverview NewExpression analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;

var MESSAGE = '"{{0}}" makes the code impure';

module.exports = function(context, allowed, allowedWithParams) {
    return function (node) {
        var ctorString = getCtorName(context, node);

        if (!ctorString) {
            ctorString = 'new <Constructor>()';
        } else if (
            allowed.indexOf(ctorString) > -1 ||
            (allowedWithParams.indexOf(ctorString) > -1 && hasParams(node))
        ) {
            return;
        }

        ctorString = 'new ' + ctorString + '()';
        context.report({
            node: node,
            message: MESSAGE,
            data: [ ctorString ]
        });
    };
};

// -------------- private methods --------------
var CTOR_NAME_MASK = /^new(\s+)(.*?)\(/;

function hasParams(node) {
    return node.arguments && node.arguments.length > 0;
}

function getCtorName(context, node) {
    var text = getCode(context, node);
    var ctorName = CTOR_NAME_MASK.exec(text);

    if (!ctorName || !ctorName[2]) {
        return ''; // something unexpected happened
    }

    return ctorName[2]
        .replace(/\s+/g, ' ')
        .replace(/ \./g, '.');
}
