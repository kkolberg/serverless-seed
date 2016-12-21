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

export function auth(event: any, context: any, callback: Function) {
    let config = new AuthConfig();

    let logic = new AuthLogic(new AuthRepository(config, request));

    logic.handle(event, context, callback);
}