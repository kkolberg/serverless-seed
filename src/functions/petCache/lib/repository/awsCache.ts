import AWS = require("aws-sdk");
import { Cache, PutCallback, ListCallback } from "src/functions/petCache/lib/repository/cache";
import { Pet } from "src/functions/petCache/model/pet";
const uuid = require("uuid");

export class AWSCache implements Cache {
    private db: AWS.DynamoDB.DocumentClient;

    constructor(db: AWS.DynamoDB.DocumentClient) {
        this.db = db;
    }

    put(pet: Pet, callback: PutCallback) {
        const timestamp = new Date().getTime();
        const params = {
            TableName: "pets",
            Item: {
                id: uuid.v1(),
                name: pet.name,
                weight: pet.weight,
                price: pet.price,
                createdAt: timestamp,
                updatedAt: timestamp,
            }
        };

        this.db.put(params, (err: any, result: any) => {
            callback(err);
        });

    }

    list(callback: ListCallback) {

        const params = {
            TableName: "pets"
        };

        this.db.scan(params, (err: any, result: any) => {
            // handle potential errors
            if (err) {
                callback(new Error("Couldn\'t fetch the todos."), null);
                return;
            }
            callback(null, result.Items);
        });

    }
}