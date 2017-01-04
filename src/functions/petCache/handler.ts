// This is a work around so the test files can find their code once compiled
// typescript understands that src/* is actually ./src/* due to the baseUrl
// in the tsconfig file.
// when compiled the files are actually in ./build/src/*
import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");
let dotenv = require("dotenv").config({ silent: true });

import AWS = require("aws-sdk");
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { NodeCallback } from "src/shared/lib/nodeCallback";
import { BaseConfig } from "src/shared/model/baseConfig";
import { AWSCache } from "src/functions/petCache/lib/repository/awsCache";
import { CacheLogic } from "src/functions/petCache/lib/cacheLogic";

// Initialize outside of scope for efficient re-use
// see http://blog.rowanudell.com/database-connections-in-lambda/
let config = new BaseConfig();
let respHandler = new ResponseHandler();

const dynamoDb = new AWS.DynamoDB.DocumentClient();
let cache = new AWSCache(dynamoDb);

export function petCache(event: any, context: any, callback: NodeCallback) {
    if (event && event.headers && event.headers["X-Heartbeat"]) {
        return respHandler.done(null, { "alive": true }, callback);
    }

    if (event && event.headers && event.headers["X-Info"]) {
        return respHandler.done(null, config.info, callback);
    }

    let logic = new CacheLogic(respHandler, cache);
    logic.handle(event, context, callback);
}