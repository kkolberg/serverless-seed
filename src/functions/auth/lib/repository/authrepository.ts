import request = require("@types/request");
import { AuthConfig } from 'src/functions/auth/model/AuthConfig';
import { IAM } from 'src/functions/auth/model/IAM';
import { Statement } from 'src/functions/auth/model/Statement';

interface GluResponse {
    status: string
}

interface GluRequest {
    token: string
}

export class AuthRepository {

    private request: request.RequestAPI<request.Request, request.CoreOptions, request.UriOptions>;
    private config: AuthConfig;

    constructor(config: AuthConfig, request: request.RequestAPI<request.Request, request.CoreOptions, request.UriOptions>) {
        this.config = config;
        this.request = request;
    }

    private buildIAM(status: string, methodArn: string) {

        let statement = <Statement>{
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: methodArn
        };

        if (status === 'ALLOWED') {
            statement = {
                Action: "execute-api:Invoke",
                Effect: "Allow",
                Resource: "*"

            };
        }

        let iam = <IAM>{
            principalId: "e9ef05797d33474c9121010599eeba4b",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [statement]
            }
        };

        return iam;
    }

    fetch(token: string, methodArn: string, callback: Function) {
        let gluReq = <GluRequest>{
            token: token
        };

        let handleResponse = (err: any, res: any, body: string) => {
            if (err) {
                return callback(err, null);
            }
            let response = <GluResponse>JSON.parse(body);
            let iam = this.buildIAM(response.status, methodArn);
            callback(null, iam);
        };

        this.request.post(this.config.url, {
            body: JSON.stringify(gluReq)
        }, handleResponse);
    };
}
