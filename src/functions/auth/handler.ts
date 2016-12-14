//This is a work around so the test files can find their code once compiled
//typescript understands that src/* is actually ./src/* due to the baseUrl
//in the tsconfig file.
//when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");


import { AuthLogic } from 'src/functions/auth/lib/AuthLogic';
import { ResponseHandler } from 'src/lib/ResponseHandler';
import { AuthRepository } from 'src/functions/auth/lib/repository/AuthRepository';

export function auth(event: any, context: any, callback: Function) {
    let logic = new AuthLogic(new AuthRepository(), new ResponseHandler());

    logic.handle(event, context, callback);
}