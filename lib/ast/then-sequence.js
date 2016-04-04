/**
 * @fileoverview MemberExpression analyzer adapted for `.then()` sequence (ESLint Pureness plugin)
 * @author Roman Melnyk
 */
'use strict';

var MESSAGE = '".then()" should be terminated by ".catch()" or ".done()"';

module.exports = function(context) {
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