/**
 * @fileoverview MemberExpression analyzer adapted for `.then()` sequence (ESLint Pureness plugin)
 * @author Roman Melnyk
 * @notes The AST cannot traverse nodes forward so we need to save the previous one and do the next-previous comparison
 */
'use strict';

var catchNode = null;
var prevNode = null;
var MESSAGE = '".then()" should be terminated by ".catch()" (or ".done()" depending on )';

module.exports = function(context) {
    return function (node) {
        if (node.prototype && (node.property.name === 'catch' || node.property.name === 'done')) {
            catchNode = node;
            return;
            /*context.report({
                node: node,
                message: MESSAGE
            });*/
        }

        if (prevNode && node.prototype.name) {}
    };
};
