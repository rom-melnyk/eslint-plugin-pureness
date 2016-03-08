/**
 * @fileoverview `import` analyzer (import specifier) for the ESLint Pureness plugin
 * @author Roman Melnyk
 */
'use strict';

var getCode = require('../utils/ast-utils').getCode;
var stripPretty = require('../utils/utils').stripPretty;

var MESSAGE = '"import { {{0}} } from ..." is not recommended in this module';

module.exports = function(context, forbiddenModuleMasks) {
    return function (node) {
        forbiddenModuleMasks.forEach(function(mask) {
            // this returns module path;
            // if we want to analyze the module/submodule name, we need to analyze the `.getCode(context, node);`
            var importedName = getCode(context, node.imported);
            if (importedName.indexOf(mask) > -1) {
                context.report({
                    node: node,
                    message: MESSAGE,
                    data: [ stripPretty(importedName, mask) ]
                });
            }
        });
    };
};
