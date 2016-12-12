import { RepoInterface } from './repository/repointerface';
import { ResponseHandler } from '../../../lib/responsehandler';
import { Pet } from '../model/pet'

export class PetsLogic {
    private repo: RepoInterface;
    private respHandler: ResponseHandler;

    constructor(repo: RepoInterface, respHandler: ResponseHandler) {
        this.repo = repo;
        this.respHandler = respHandler;
    }


    handle(event: any, context: any, callback: Function) {
        switch (event.httpMethod) {
            case 'GET':
                this.repo.fetch((err: any, res: any) => {
                    this.respHandler.done(null, res, callback);
                });
                break;
            case 'POST':
                this.savePet(event, callback);
                break;
            default:
                this.respHandler.done(new Error('Unsupported method "${event.httpMethod}"'), null, callback);
        }
    }

    private savePet(event: any, callback: Function) {
        let pet = <Pet>JSON.parse(event.body);
        this.repo.save(pet, (err: any, res: Array<Pet>) => {
            this.respHandler.done(err, res, callback);
        });
    }
}