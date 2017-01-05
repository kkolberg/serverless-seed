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

// Initialize outside of scope for efficient re-use
// see http://blog.rowanudell.com/database-connections-in-lambda/

let respHandler = new ResponseHandler();

let myCredentials = new AWS.Credentials({
    accessKeyId: "",
    secretAccessKey: ""
});

let myConfig = new AWS.Config({
    credentials: myCredentials,
    region: "us-east-1"
});

let s3 = new AWS.S3({ signatureVersion: "v4" });

export function petImages(event: any, context: any, callback: NodeCallback) {
    if (event && event.headers && event.headers["X-Heartbeat"]) {
        return respHandler.done(null, { "alive": true }, callback);
    }

    let params = { Bucket: "petbucketkksomething", Key: "petsBucketCat" + Date.now() };
    s3.getSignedUrl("putObject", params, function (err, url) {
        return respHandler.done(err, { url: url }, callback);
    });
}