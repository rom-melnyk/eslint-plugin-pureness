/**
 * @fileoverview Ensures files don't `import/require` forbidden modules
 * @author Roman Melnyk
 */
'use strict';

var utils = require('./utils/utils');
var treatAsArray = utils.treatAsArray;
var concatUnique = utils.concatUnique;
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

var checkImportDeclaration = require('./ast/import-declaration');
var checkRequireCallExpression = require('./ast/require-call-expression');

module.exports = function(context) {
    var forbiddenModuleMasks = getForbiddenModuleMasks(context);
    if (forbiddenModuleMasks.length > 0) {
        return {
            ImportDeclaration: checkImportDeclaration(context, forbiddenModuleMasks),
            CallExpression: checkRequireCallExpression(context, forbiddenModuleMasks)
        };
    } else {
        return {};
    }
};

// --------------------------------- private methods ---------------------------------
function getForbiddenModuleMasks(context) {
    var moduleMasks = [];

    treatAsArray(context.options)
        .filter(function (option) {
            return doesFilenameMatchMasks(context.getFilename(), option.masks);
        }).forEach(function (option) {
            concatUnique(moduleMasks, option.modules);
        });

    return moduleMasks;
}
