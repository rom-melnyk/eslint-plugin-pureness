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
            // this returns module path;
            // if we want to analyze the module/submodule name, we need to analyze the `.getCode(context, node);`
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

// -------------- private methods --------------
var MASK_NEW_LINE = /\n/g;
var MASK_MULTI_SPACE = /\s+/g;
var MASK_TRIM_SPACE = /^\s|\s$/g;

function groomString(string) {
    return string.replace(MASK_NEW_LINE, '').replace(MASK_MULTI_SPACE, ' ');
}

function isEs6Import(string) {
    return string.indexOf('import') === 0;
}
