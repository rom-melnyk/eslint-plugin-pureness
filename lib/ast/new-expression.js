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

function getCtorString(context, node) {
    var text = getCode(context, node);
    var strippedText = /^new .*?\(/.exec(text);

    return strippedText ? strippedText[0] + ')' : 'new <Constructor>()';
}
