import { AuthRepository } from "src/functions/auth/lib/repository/authrepository";
import { ResponseHandler } from "src/shared/lib/responsehandler";

export class AuthLogic {
    private repo: AuthRepository;

    constructor(repo: AuthRepository) {
        this.repo = repo;
    }

    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes("heartbeat")) {
            return ResponseHandler.done(null, { "alive": true }, callback);
        }

        let body = event.body ? JSON.parse(event.body) : {};

        let authToken = event.authorizationToken ? event.authorizationToken : body.authorizationToken;
        let methodArn = event.methodArn ? event.methodArn : body.methodArn;

        this.repo.fetch(authToken, methodArn, (err: any, res: any) => {
            if (err) {
                return callback(err, null);
            }

            if (event.httpMethod) {
                return ResponseHandler.done(null, res, callback);
            }
            return callback(null, res);
        });
    }
}