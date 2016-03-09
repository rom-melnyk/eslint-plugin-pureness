/**
 * @fileoverview `import` analyzer (import declaration) for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;
var stripPretty = require('../utils/utils').stripPretty;

var MESSAGE = '"import ... from {{0}}" is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function(mask) {
            var moduleName = getCode(context, node.source);
            if (moduleName && moduleName.toLowerCase().indexOf(mask) > -1) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: [ stripPretty(moduleName, mask) ]
                });
            }
        });
    };
};
