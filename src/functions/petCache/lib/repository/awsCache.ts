import AWS = require("aws-sdk");
import { Cache } from "src/functions/petCache/lib/repository/cache";
import { Pet } from "src/functions/petCache/model/pet";
import { PutCallback } from "src/functions/petCache/lib/repository/cache";
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
            if (err) {
                return callback(err, null);
            }
            callback(null, result.Item);
        });

    }
}