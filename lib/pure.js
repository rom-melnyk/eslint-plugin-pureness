/**
 * @fileoverview Ensures files/methods are pure
 * @author Roman Melnyk
 */
'use strict';

var checkMemberExpression = require('./ast/member-expression');

/**
 * @type {String[]}
 * Calls that make methods unpure.
 * "Generator.*" means that any method of "Generator" object will raise the error/warning.
 */
var FORBIDDEN_MEMBER_EXPRESSIONS = [
    'Math.random', 'Date.now', '_.now'
];

module.exports = function(context) {
    var filename = context.getFilename().toLowerCase();
    var filenameMasks = context.options.map(__toLowerCase);

    var shouldAnalyzeContext = filenameMasks.some(function (mask) {
        return filename.indexOf(mask) > -1;
    });

    if (shouldAnalyzeContext) {
        return {
            //FunctionDeclaration: checkBlock,
            //BlockStatement: checkBlockFactory('body'),
            //BinaryExpression: checkBinaryExpression,
            MemberExpression: checkMemberExpression(context)
            //ExpressionStatement: checkBlock
        };
    } else {
        return {};
    }
};

// ------------------------------------ private methods ------------------------------------
function __toLowerCase(str) {
    return str.toLowerCase();
}

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

function checkBinaryExpression(node) {
}
