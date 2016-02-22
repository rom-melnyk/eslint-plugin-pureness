/**
 * @fileoverview Analyzes `require('...')` for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;

var MESSAGE = '"require({{0}})" is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function (mask) {
            if (
                node.callee && node.callee.name === 'require' &&
                getCode(context, node.arguments && node.arguments[0])
                    .indexOf(mask) > -1
            ) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: ['\'...' + mask + '...\'']
                });
            }
        });
    };
};
