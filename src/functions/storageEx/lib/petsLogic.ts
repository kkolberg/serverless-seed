import { PetsRepository, FetchCallback, SaveCallback } from "src/functions/storageEx/lib/repository/petsRepository";
import { ResponseHandler } from "src/shared/lib/responseHandler";
import { Pet } from "src/functions/storageEx/model/pet";
import { NodeCallback } from "src/shared/lib/nodeCallback";

export class PetsLogic {
    private repo: PetsRepository;
    private respHandle: ResponseHandler;

    constructor(repo: PetsRepository, respHandle: ResponseHandler) {
        this.repo = repo;
        this.respHandle = respHandle;
    }

    handle(event: any, context: any, callback: NodeCallback) {
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

    private fetchPets(callback: NodeCallback) {
        let fetchCallback: FetchCallback = (err, res) => {
            this.respHandle.done(null,
                {
                    "pets": res,
                    "repo": this.repo.type
                }, callback);
        };
        this.repo.fetch(fetchCallback);
    }

    private savePet(event: any, callback: NodeCallback) {
        let pet: Pet = JSON.parse(event.body);
        let saveCallback: SaveCallback = (err, res) => {
            if (err) {
                return callback(err, null);
            }
            this.respHandle.done(err,
                {
                    "pets": res,
                    "repo": this.repo.type
                }, callback);
        };

        this.repo.save(pet, saveCallback);
    }
}