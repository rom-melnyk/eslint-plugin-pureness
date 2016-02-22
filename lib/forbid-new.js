/**
 * @fileoverview Ensures files/methods do not contain `new Ctor()` calls
 * @author Roman Melnyk
 */
'use strict';

var checkNewExpression = require('./ast/new-expression');
var doesFilenameMatchMasks = require('./utils/does-filename-match-masks');

module.exports = function(context) {
    if ( doesFilenameMatchMasks(context.getFilename(), context.options) ) {
        return {
            NewExpression: checkNewExpression(context)
        };
    } else {
        return {};
    }
};
