import { PetsRepository } from "src/functions/pets/lib/repository/petsRepository";
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { Pet } from "src/functions/pets/model/pet";

export class PetsLogic {
    private repo: PetsRepository;

    constructor(repo: PetsRepository) {
        this.repo = repo;
    }


    handle(event: any, context: any, callback: Function) {
        if (event && event.path && event.path.includes("heartbeat")) {
            return ResponseHandler.done(null, { "alive": true }, callback);
        }

        switch (event.httpMethod) {
            case "GET":
                this.repo.fetch((err: any, res: any) => {
                    ResponseHandler.done(null,
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
                ResponseHandler.done(new Error("Unsupported method \"${event.httpMethod}\""), null, callback);
        }
    }

    private savePet(event: any, callback: Function) {
        let pet = <Pet>JSON.parse(event.body);
        this.repo.save(pet, (err: any, res: Array<Pet>) => {
            ResponseHandler.done(err,
                {
                    "pets": res,
                    "repo": this.repo.type
                }, callback);
        });
    }
}