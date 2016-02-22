/**
 * @fileoverview `import` analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;

var MESSAGE = '"import ... from {{0}}" is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function(mask) {
            if (getCode(context, node.source).indexOf(mask) > -1) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: ['\'...' + mask + '...\'']
                });
            }
        });
    };
};
