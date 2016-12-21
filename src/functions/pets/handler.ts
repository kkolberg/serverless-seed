// This is a work around so the test files can find their code once compiled
// typescript understands that src/* is actually ./src/* due to the baseUrl
// in the tsconfig file.
// when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
let dotenv = require("dotenv").config({ silent: true });

import { Pet } from "src/functions/pets/model/pet";
import { PetsLogic } from "src/functions/pets/lib/petslogic";
import { RepositoryFactory } from "src/functions/pets/lib/repository/repositoryfactory";
import { PetsConfig } from "src/functions/pets/model/petsconfig";

export function pets(event: any, context: any, callback: Function) {

  let logic = new PetsLogic(new RepositoryFactory(new PetsConfig()).getRepository());

  logic.handle(event, context, callback);
}