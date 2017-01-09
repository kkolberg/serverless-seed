import { ResponseHandler } from "src/shared/lib/responseHandler";
import { NodeCallback } from "src/shared/lib/nodeCallback";
import { Pet } from "src/functions/dynamoDBCacheEx/model/pet";
import { Cache, PutCallback, ListCallback } from "src/functions/dynamoDBCacheEx/lib/repository/cache";

export class CacheLogic {
    private cache: Cache;
    private respHandler: ResponseHandler;

    constructor(respHandler: ResponseHandler, cache: Cache) {
        this.respHandler = respHandler;
        this.cache = cache;
    }

    handle(event: any, context: any, callback: NodeCallback) {
        let pet: Pet = {
            name: "cat",
            price: 1,
            weight: 100
        };

        this.cache.put(pet, (err) => {
            if (err) {
                return this.respHandler.done(err, null, callback);
            }

            // return this.respHandler.done(null, null, callback);

            this.cache.list((err, pets) => {
                if (err) {
                    return this.respHandler.done(err, null, callback);
                }

                return this.respHandler.done(null, pets, callback);
            });
        });
    }
}