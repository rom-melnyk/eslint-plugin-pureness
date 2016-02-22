/**
 * @fileoverview NewExpression analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var MESSAGE = '"{{0}}" makes the method unpure';

module.exports = function(context) {
    return function (node) {
        context.report({
            node: node,
            message: MESSAGE,
            data: [getCtorString(context, node)]
        });
    };
};

function getCtorString(context, node) {
    var sourceCode = context.getSourceCode();
    var text = sourceCode && sourceCode.getText(node);
    if (/\n/.test(text)) {
        text = text.replace(/\n/g, '');
    }
    var strippedText = /^new .*?\(/.exec(text);

    return strippedText ? strippedText[0] + ')' : 'new <Constructor>()';
}
