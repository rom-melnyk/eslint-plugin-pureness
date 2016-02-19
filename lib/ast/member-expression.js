/**
 * @fileoverview MemberExpression analyzed for the Pureness ESLint plugin
 * @author Roman Melnyk
 */
'use strict';

var config = require('rc')('eslint-plugin-pureness-', {
    'unpure-expressions': [
        'Math.random', 'Date.now', '_.now'
    ]
});

var FORBIDDEN_EXPRESSIONS = config['unpure-expressions'];

var MESSAGE = '"{{0}}.{{1}}()" makes the method unpure';

module.exports = function(context) {
    return function (node) {
        FORBIDDEN_EXPRESSIONS.forEach(function (expr, index) {
            // ensure strings are split only once
            if (typeof expr === 'string') {
                expr = expr.split('.');
                FORBIDDEN_EXPRESSIONS[index] = expr;
            }

            if (
                node.object && node.object.name === expr[0] &&
                (
                    node.property && node.property.name && expr[1] ||
                    expr[1] === '*'
                )
            ) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: expr
                });
            }
        });
    };
};
