// This is a work around so the test files can find their code once compiled
// typescript understands that src/* is actually ./src/* due to the baseUrl
// in the tsconfig file.
// when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
let dotenv = require("dotenv").config({ silent: true });

import request = require("request");
import { AuthLogic } from "src/functions/auth/lib/authLogic";
import { AuthRepository } from "src/functions/auth/lib/repository/authRepository";
import { AuthConfig } from "src/functions/auth/model/authConfig";
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { NodeCallback } from "src/shared/lib/nodeCallback";

// Initialize outside of scope for efficient re-use
// see http://blog.rowanudell.com/database-connections-in-lambda/
let respHandler = new ResponseHandler();
let config = new AuthConfig();


export function auth(event: any, context: any, callback: NodeCallback) {
    if (event && event.headers && event.headers["X-Heartbeat"]) {
        return respHandler.done(null, { "alive": true }, callback);
    }

    if (event && event.headers && event.headers["X-Info"]) {
        return respHandler.done(null, config.info, callback);
    }


    let logic = new AuthLogic(new AuthRepository(config, request), respHandler);

    logic.handle(event, context, callback);
}