/**
 * @fileoverview MemberExpression analyzer adapted for `.then()` sequence (ESLint Pureness plugin)
 * @author Roman Melnyk
 */
'use strict';

var MESSAGE = '".then()" should be terminated by ".catch()" or ".done()"';

module.exports = function(context) {
    return function (node) {
        if (isNameEqual(node, 'property', 'then')/* && isNameEqual(node, 'property', expr[1])*/) {
            context.report({
                node: node,
                message: MESSAGE
            });
        }
    };
};

// -------------- private methods --------------
function isNameEqual(object, field, value) {
    return object[field] && object[field].name === value || value === '*'
}