/**
 * @fileoverview Analyzes `require('...')` for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;
var stripPretty = require('../utils/utils').stripPretty;

var MESSAGE = '"require({{0}})" is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function (mask) {
            var code = getCode(context, node.arguments && node.arguments[0]);
            if (
                node.callee && node.callee.name === 'require' &&
                code.indexOf(mask) > -1
            ) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: [ stripPretty(code, mask) ]
                });
            }
        });
    };
};
