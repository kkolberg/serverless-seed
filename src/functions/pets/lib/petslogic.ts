import { PetsRepository } from 'src/functions/pets/lib/repository/PetsRepository';
import { ResponseHandler } from 'src/shared/lib/ResponseHandler';
import { Pet } from 'src/functions/pets/model/Pet'

export class PetsLogic {
    private repo: PetsRepository;
    private respHandler: ResponseHandler;

    constructor(repo: PetsRepository, respHandler: ResponseHandler) {
        this.repo = repo;
        this.respHandler = respHandler;
    }


    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes('heartbeat')) {
            return this.respHandler.done(null, { "alive": true }, callback);
        }

        switch (event.httpMethod) {
            case 'GET':
                this.repo.fetch((err: any, res: any) => {
                    this.respHandler.done(null,
                        {
                            "pets": res,
                            "repo": this.repo.type
                        }, callback);
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
            this.respHandler.done(err,
                {
                    "pets": res,
                    "repo": this.repo.type
                }, callback);
        });
    }
}