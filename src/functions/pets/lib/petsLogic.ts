import { PetsRepository } from "src/functions/pets/lib/repository/petsRepository";
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { Pet } from "src/functions/pets/model/pet";

export class PetsLogic {
    private repo: PetsRepository;
    private respHandle: ResponseHandler;

    constructor(repo: PetsRepository, respHandle: ResponseHandler) {
        this.repo = repo;
        this.respHandle = respHandle;
    }


    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes("heartbeat")) {
            return this.respHandle.done(null, { "alive": true }, callback);
        }

        switch (event.httpMethod) {
            case "GET":
                this.repo.fetch((err: any, res: any) => {
                    this.respHandle.done(null,
                        {
                            "pets": res,
                            "repo": this.repo.type
                        }, callback);
                });
                break;
            case "POST":
                this.savePet(event, callback);
                break;
            default:
                this.respHandle.done(new Error("Unsupported method \"${event.httpMethod}\""), null, callback);
        }
    }

    private savePet(event: any, callback: Function) {
        let pet = <Pet>JSON.parse(event.body);
        this.repo.save(pet, (err: any, res: Array<Pet>) => {
            this.respHandle.done(err,
                {
                    "pets": res,
                    "repo": this.repo.type
                }, callback);
        });
    }
}