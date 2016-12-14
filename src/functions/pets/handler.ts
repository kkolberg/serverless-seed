//This is a work around so the test files can find their code once compiled
//typescript understands that src/* is actually ./src/* due to the baseUrl
//in the tsconfig file.
//when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");

import { Pet } from 'src/functions/pets/model/Pet';
import { PetsLogic } from 'src/functions/pets/lib/PetsLogic';
import { ResponseHandler } from 'src/lib/ResponseHandler';
import {RepositoryFactory}from 'src/functions/pets/lib/repository/RepositoryFactory';

export function pets(event: any, context: any, callback: Function) {
  let logic = new PetsLogic(new RepositoryFactory().getRepository(), new ResponseHandler());
 
  logic.handle(event, context, callback);
}