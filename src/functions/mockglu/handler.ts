//This is a work around so the test files can find their code once compiled
//typescript understands that src/* is actually ./src/* due to the baseUrl
//in the tsconfig file.
//when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");

import { ResponseHandler } from 'src/lib/ResponseHandler';

export function glu(event: any, context: any, callback: Function) {
    let respHandler = new ResponseHandler();

    if (event && event.path && event.path.includes('heartbeat')) {
        return this.respHandler.done(null, { "alive": true }, callback);
    }

    let token = JSON.parse(event.body).token;

    if (token === "cat") {
        return respHandler.done(null, {
            "status": "ALLOWED"
        }, callback);
    }

    return respHandler.done(null, {
        "status": "DENY"
    }, callback);
}