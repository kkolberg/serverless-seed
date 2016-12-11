import path = require("path");

require("app-module-path").addPath("." + path.sep + "build");
require("app-module-path").addPath("." + path.sep);

import { PetsRepo } from './lib/repository/PetsRepo';
import { Blah } from '../../lib/Blah';
import { PetsLogic } from './lib/PetsLogic';

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

  let logic = new PetsLogic(new PetsRepo(new Blah()));
  logic.something(done);
}