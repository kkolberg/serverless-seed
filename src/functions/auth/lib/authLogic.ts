import { AuthRepository } from "src/functions/auth/lib/repository/authRepository";
import { ResponseHandler } from "src/shared/lib/responseHandler";

export class AuthLogic {
    private repo: AuthRepository;
    private respHandler: ResponseHandler;

    constructor(repo: AuthRepository, respHandler: ResponseHandler) {
        this.repo = repo;
        this.respHandler = respHandler;
    }

    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes("heartbeat")) {
            return this.respHandler.done(null, { "alive": true }, callback);
        }

        let body = event.body ? JSON.parse(event.body) : {};

        let authToken = event.authorizationToken ? event.authorizationToken : body.authorizationToken;
        let methodArn = event.methodArn ? event.methodArn : body.methodArn;

        this.repo.fetch(authToken, methodArn, (err: any, res: any) => {
            if (err) {
                return callback(err, null);
            }

            if (event.httpMethod) {
                return this.respHandler.done(null, res, callback);
            }
            return callback(null, res);
        });
    }
}