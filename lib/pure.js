/**
 * @fileoverview Ensures files/methods are pure
 * @author Roman Melnyk
 */
'use strict';

var checkMemberExpression = require('./ast/member-expression');

module.exports = function(context) {
    if (shouldAnalyzeContext(context)) {
        return {
            MemberExpression: checkMemberExpression(context)
        };
    } else {
        return {};
    }
};

// --------------------------------- private methods ---------------------------------
function shouldAnalyzeContext(context) {
    var filename = context.getFilename().toLowerCase();
    var filenameMasks = context.options.map(function (mask) {
        return mask.toLowerCase();
    });

    return filenameMasks.some(function (mask) {
        return mask === '*' || filename.indexOf(mask) > -1;
    });
}
