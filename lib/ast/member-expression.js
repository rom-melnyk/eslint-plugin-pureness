/**
 * @fileoverview MemberExpression analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var MESSAGE = '"{{0}}.{{1}}()" makes the method unpure';

module.exports = function(context, forbiddenExpressions) {
    return function (node) {
        forbiddenExpressions.forEach(function (expr, index) {
            // ensure strings are split only once
            if (typeof expr === 'string') {
                expr = expr.split('.');
                forbiddenExpressions[index] = expr;
            }

            if (
                node.object && node.object.name === expr[0] &&
                (
                    node.property && node.property.name === expr[1] ||
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
