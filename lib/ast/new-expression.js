/**
 * @fileoverview NewExpression analyzer for the Pureness ESLint plugin
 * @author Roman Melnyk
 */
'use strict';

var config = require('rc')('eslint-plugin-pureness-', {
    'allow-new': false
});

var MESSAGE = '"{{0}}" makes the method unpure';

module.exports = function(context) {
    return function (node) {
        if (config['allow-new']) {
            return;
        }

        context.report({
            node: node,
            message: MESSAGE,
            data: [getCtorName(context, node)]
        });
    };
};

function getCtorName(context, node) {
    var sourceCode = context.getSourceCode();
    return sourceCode && sourceCode.getText(node) || '<Constructor>';
}