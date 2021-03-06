//This is a work around so the test files can find their code once compiled
//typescript understands that src/* is actually ./src/* due to the baseUrl
//in the tsconfig file.
//when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
var dotenv = require('dotenv').config({ silent: true });

import request = require("request");
import { AuthLogic } from 'src/functions/auth/lib/AuthLogic';
import { ResponseHandler } from 'src/shared/lib/ResponseHandler';
import { AuthRepository } from 'src/functions/auth/lib/repository/AuthRepository';
import { AuthConfig } from 'src/functions/auth/model/AuthConfig';

export function auth(event: any, context: any, callback: Function) {
    let config = new AuthConfig();

    let logic = new AuthLogic(new AuthRepository(config, request), new ResponseHandler());

    logic.handle(event, context, callback);
}