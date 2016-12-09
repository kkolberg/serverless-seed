"use strict";
function hello(event, context, callback) {
    var response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'This message is writen by TypeScript.',
            input: event
        })
    };
    callback(null, response);
}
exports.hello = hello;
//# sourceMappingURL=handler.js.map