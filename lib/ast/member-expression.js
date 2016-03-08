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

            if (isNameEqual(node, 'object', expr[0]) && isNameEqual(node, 'property', expr[1])) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: expr
                });
            }
        });
    };
};

// -------------- private methods --------------
function isNameEqual(object, field, value) {
    return object[field] && object[field].name === value || value === '*'
}