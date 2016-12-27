import { NodeCallback } from "src/shared/lib/nodeCallback";

export class ResponseHandler {
    done(err: any, res: any, callback: NodeCallback) {
        callback(null, {
            statusCode: err ? "400" : "200",
            body: err ? JSON.stringify({ error: err.message }) : JSON.stringify(res),
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}