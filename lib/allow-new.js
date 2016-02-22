/**
 * @fileoverview Ensures files/methods do not contain `new Ctor();` calls
 * @author Roman Melnyk
 */
'use strict';

var checkNewExpression = require('./ast/new-expression');

module.exports = function(context) {
    if (shouldAnalyzeContext(context)) {
        return {
            NewExpression: checkNewExpression(context)
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
