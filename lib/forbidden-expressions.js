/**
 * @fileoverview Ensures files/methods don't contain forbidden (unpure) expressions
 * @author Roman Melnyk
 */
'use strict';

var utils = require('./utils/utils');
var treatAsArray = utils.treatAsArray;
var concatUnique = utils.concatUnique;
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

var checkMemberExpression = require('./ast/member-expression');

module.exports = function(context) {
    var forbiddenExpressions = getForbiddenExpressions(context);
    if (forbiddenExpressions.length > 0) {
        return {
            MemberExpression: checkMemberExpression(context, forbiddenExpressions)
        };
    } else {
        return {};
    }
};

// --------------------------------- private methods ---------------------------------
function getForbiddenExpressions(context) {
    var expressions = [];

    treatAsArray(context.options)
        .filter(function (option) {
            return doesFilenameMatchMasks(context.getFilename(), option.masks);
        }).forEach(function (option) {
            concatUnique(expressions, option.expressions);
        });

    return expressions;
}
