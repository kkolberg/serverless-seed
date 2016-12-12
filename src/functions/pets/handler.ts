import path = require("path");

require("app-module-path").addPath("." + path.sep + "build");


export function pets(event: any, context: any, callback: Function) {


  var done = function (err: any, res: any) {
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? JSON.stringify({ error: err.message }) : JSON.stringify(res),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };
}