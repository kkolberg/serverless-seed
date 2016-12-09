import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");

import {Blah} from 'src/lib/Blah'
export function pets(event: any, context: any, callback: any) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This message is writen by TypeScript.',
      input: process.env
    })
  };

  callback(null, response);
}