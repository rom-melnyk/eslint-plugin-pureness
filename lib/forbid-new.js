/**
 * @fileoverview Ensures files/methods do not contain `new Ctor()` calls
 * @author Roman Melnyk
 */
'use strict';

var utils = require('./utils/utils');
var treatAsArray = utils.treatAsArray;
var concatUnique = utils.concatUnique;
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

var checkNewExpression = require('./ast/new-expression');

module.exports = function(context) {
    var params = getNewExpressionParams(context);
    if (params.shouldVerify) {
        return {
            NewExpression: checkNewExpression(context, params.allow, params.allowWithParams)
        };
    } else {
        return {};
    }
};

// --------------------------------- private methods ---------------------------------
/**
 *
 * @param context
 * @returns {{shouldVerify: Boolean, allow: String[], allowWithParams: String[]}}
 */
function getNewExpressionParams(context) {
    var filename = context.getFilename();
    var shouldVerify = false;
    var allow = [];
    var allowWithParams = [];
    var mask;

    treatAsArray(context.options)
        .filter(function (option) {
            // We still support String[] as options
            // TODO remove this in next version
            mask = option.masks || option;
            return doesFilenameMatchMasks(filename, mask);
        }).forEach(function (option) {
            shouldVerify = true;
            concatUnique(allow, option.allow || []);
            concatUnique(allowWithParams, option.allowWithParams || option['allow-with-params'] || []);
        });

    return {
        shouldVerify: shouldVerify,
        allow: allow,
        allowWithParams: allowWithParams
    };
}
