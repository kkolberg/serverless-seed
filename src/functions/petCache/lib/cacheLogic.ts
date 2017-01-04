import { ResponseHandler } from "src/shared/lib/responseHandler";
import { NodeCallback } from "src/shared/lib/nodeCallback";
import { Cache } from "src/functions/petCache/lib/repository/cache";
import { Pet } from "src/functions/petCache/model/pet";
import { PutCallback } from "src/functions/petCache/lib/repository/cache";

export class CacheLogic {
    private cache: Cache;
    private respHandler: ResponseHandler;

    constructor(respHandler: ResponseHandler, cache: Cache) {
        this.respHandler = respHandler;
        this.cache = cache;
    }

    handle(event: any, context: any, callback: NodeCallback) {
        let pet = <Pet>{
            name: "cat",
            price: 1,
            weight: 100
        };

        this.cache.put(pet, <PutCallback>(err: any, data: Pet) => {
            if (err) {
                return this.respHandler.done(err, null, callback);
            }

            return this.respHandler.done(null, data, callback);
        });
    }
}