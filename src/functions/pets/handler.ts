import path = require("path");

if (process.env.IS_SERVERLESS || process.env.IS_OFFLINE) {
  require("app-module-path").addPath(process.env.PWD + path.sep + "build");
}

import { Blah } from "src/lib/Blah";
import { PetsRepo } from "src/functions/pets/lib/repository/PetsRepo";
var repo = new PetsRepo(Blah);

export function pets(event: any, context: any, callback: any) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This message is writen by TypeScript.',
      input: event
    })
  };

  callback(null, response);
}