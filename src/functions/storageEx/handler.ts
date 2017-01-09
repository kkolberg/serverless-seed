// This is a work around so the test files can find their code once compiled
// typescript understands that src/* is actually ./src/* due to the baseUrl
// in the tsconfig file.
// when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
let dotenv = require("dotenv").config({ silent: true });

import { Pet } from "src/functions/storageEx/model/pet";
import { PetsLogic } from "src/functions/storageEx/lib/petsLogic";
import { RepositoryFactory } from "src/functions/storageEx/lib/repository/repositoryFactory";
import { PetsConfig } from "src/functions/storageEx/model/petsConfig";
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { NodeCallback } from "src/shared/lib/nodeCallback";

// Initialize outside of scope for efficient re-use
// see http://blog.rowanudell.com/database-connections-in-lambda/
let config = new PetsConfig();
let respHandler = new ResponseHandler();

export function pets(event: any, context: any, callback: NodeCallback) {
    if (event && event.headers && event.headers["X-Heartbeat"]) {
        return respHandler.done(null, { "alive": true }, callback);
    }

    if (event && event.headers && event.headers["X-Info"]) {
        return respHandler.done(null, config.info, callback);
    }

    let factory = new RepositoryFactory(config);
    let logic = new PetsLogic(factory.getRepository(), respHandler);

    logic.handle(event, context, callback);
}