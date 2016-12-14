import { AuthRepository } from 'src/functions/auth/lib/repository/AuthRepository';
import { ResponseHandler } from 'src/lib/ResponseHandler';

export class AuthLogic {
    private repo: AuthRepository;
    private respHandler: ResponseHandler;

    constructor(repo: AuthRepository, respHandler: ResponseHandler) {
        this.repo = repo;
        this.respHandler = respHandler;
    }

    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes('heartbeat')) {
            return this.respHandler.done(null, { "alive": true }, callback);
        }

        this.repo.fetch(event.authorizationToken, event.methodArn, (err: any, res: any) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, res);
        });
    }
}