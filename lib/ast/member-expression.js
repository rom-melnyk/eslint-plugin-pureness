/**
 * @fileoverview MemberExpression analyzed for the Pureness ESLint plugin
 * @author Roman Melnyk
 */
'use strict';

/**
 * @type {String[]}
 * Calls that make methods unpure.
 * "Generator.*" means that any method of "Generator" object will raise the error/warning.
 */
var FORBIDDEN_MEMBER_EXPRESSIONS = [
    'Math.random', 'Date.now', '_.now'
];

var REPORT_MESSAGE = 'This makes the method unpure: {{0}}.{{1}}()';

module.exports = function(context) {
    return function (node) {
        FORBIDDEN_MEMBER_EXPRESSIONS.forEach(function (expr, index) {
            // ensure strings are split only once
            if (typeof expr === 'string') {
                expr = expr.split('.');
                FORBIDDEN_MEMBER_EXPRESSIONS[index] = expr;
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
                    message: REPORT_MESSAGE,
                    data: expr
                });
            }
        });
    };
};
