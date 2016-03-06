/**
 * @fileoverview NewExpression analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;

var MESSAGE = '"{{0}}" makes the method unpure';

module.exports = function(context) {
    return function (node) {
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
