/**
 * @fileoverview Ensures files/methods are pure
 * @author Roman Melnyk
 */
'use strict';

var checkMemberExpression = require('./ast/member-expression');

module.exports = function(context) {
    var filename = context.getFilename().toLowerCase();
    var filenameMasks = context.options.map(function (mask) {
        return mask.toLowerCase();
    });

    var shouldAnalyzeContext = filenameMasks.some(function (mask) {
        return filename.indexOf(mask) > -1;
    });

    if (shouldAnalyzeContext) {
        return {
            //FunctionDeclaration: checkBlock,
            //BlockStatement: checkBlockFactory('body'), // this verifies function body
            MemberExpression: checkMemberExpression(context)
        };
    } else {
        return {};
    }
};

// ------------------------------------ private methods ------------------------------------
function __isStatement(node) {
    return node && node.type.indexOf('Statement') > -1;
}

function __isDeclaration(node) {
    return node && node.type.indexOf('Declaration') > -1;
}

function __isExpression(node) {
    return node && node.type.indexOf('Expression') > -1;
}

function checkBlockFactory(target) {
    return function checkBlock(node) {
        var destination = node[target];
    }
}
