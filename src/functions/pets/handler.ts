import path = require("path");

require("app-module-path").addPath("." + path.sep + "build");

import { Pet } from './model/pet';
import { PetsLogic } from './lib/petslogic';
import { PetsRepo } from './lib/repository/petsrepo';
import { ResponseHandler } from '../../lib/responsehandler';



export function pets(event: any, context: any, callback: Function) {
  let logic = new PetsLogic(new PetsRepo(), new ResponseHandler());
  logic.handle(event, context, callback);
}