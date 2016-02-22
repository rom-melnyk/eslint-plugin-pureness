/**
 * @fileoverview `import` analyzer for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;
var stripPretty = require('../utils/utils').stripPretty;

var MESSAGE = '"import ... from {{0}}" is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function(mask) {
            var code = getCode(context, node.source);
            if (code.indexOf(mask) > -1) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: [ stripPretty(code, mask) ]
                });
            }
        });
    };
};
