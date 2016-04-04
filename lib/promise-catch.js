/**
 * @fileoverview Ensures `.then()` sequences are terminated by `.catch()`/`.done()`
 * @author Roman Melnyk
 */
'use strict';

var utils = require('./utils/utils');
var treatAsArray = utils.treatAsArray;
var concatUnique = utils.concatUnique;
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

var checkThenSequence = require('./ast/then-sequence');

module.exports = function(context) {
    var forbiddenExpressions = getForbiddenExpressions(context);
    if (forbiddenExpressions.length > 0) {
        return {
            MemberExpression: checkThenSequence(context, forbiddenExpressions)
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
