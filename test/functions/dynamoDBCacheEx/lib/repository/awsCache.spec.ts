import AWS = require("aws-sdk");
import { assert } from "chai";
import { Pet } from "src/functions/dynamoDBCacheEx/model/pet";
import { Cache, PutCallback, ListCallback } from "src/functions/dynamoDBCacheEx/lib/repository/cache";
import { AWSCache } from "src/functions/dynamoDBCacheEx/lib/repository/awsCache";



describe("AWSCache", () => {
    describe("#put", () => {
        it("should add with timestamp", () => {
            let db = <AWS.DynamoDB.DocumentClient>{
                put: function (params, callback) {
                    assert.isNotNull(params, "params");
                    assert.isNotNull(params.Item);
                    assert.isNotNull(params.Item["updatedAt"]);
                    assert.isNotNull(params.Item["createdAt"]);
                    callback(null, {});
                }
            };
            let cache = new AWSCache(db);
            let pet = <Pet>{};
            cache.put(pet, <PutCallback>(err: any) => {
                assert.isNull(err);
            });
        });
        it("should add id", () => {
            let db = <AWS.DynamoDB.DocumentClient>{
                put: function (params, callback) {
                    assert.isNotNull(params);
                    assert.isNotNull(params.Item);
                    assert.isNotNull(params.Item["id"]);
                    callback(null, {});
                }
            };
            let cache = new AWSCache(db);
            let pet = <Pet>{};
            cache.put(pet, <PutCallback>(err: any) => {
                assert.isNull(err);
            });
        });
        it("should pass pet properties", () => {
            let pet = <Pet>{
                name: "pname",
                weight: 100,
                price: 1.2
            };
            let db = <AWS.DynamoDB.DocumentClient>{
                put: function (params, callback) {
                    assert.isNotNull(params);
                    assert.isNotNull(params.Item);
                    assert.equal(params.Item["name"], pet.name);
                    assert.equal(params.Item["weight"], pet.weight);
                    assert.equal(params.Item["price"], pet.price);
                    callback(null, {});
                }
            };
            let cache = new AWSCache(db);

            cache.put(pet, <PutCallback>(err: any) => {
                assert.isNull(err);
            });
        });
    });

    describe("#list", () => {
        it("should handle error", () => {
            let db = <AWS.DynamoDB.DocumentClient>{
                scan: function (params, callback) {
                    callback({
                        code: "",
                        message: "",
                        statusCode: 1,
                        retryable: false,
                        time: null,
                        hostname: "",
                        region: "",
                        retryDelay: null,
                        requestId: null,
                        extendedRequstId: null,
                        cfId: null,
                        name: null
                    }, null);
                }
            };
            let cache = new AWSCache(db);
            cache.list(<ListCallback>(err: any, pets: Pet[]) => {
                assert.isNotNull(err);
                assert.isNull(pets);
            });
        });

        it("should fetch", () => {
            let pet = <Pet>{
                name: "pname",
                weight: 100,
                price: 1.2
            };
            let db = <AWS.DynamoDB.DocumentClient>{
                scan: function (params, callback) {
                    let list = Array<Pet>();
                    list.push(pet);
                    callback(null, { Items: list });
                }
            };
            let cache = new AWSCache(db);

            cache.list(<ListCallback>(err: any, pets: Pet[]) => {
                assert.isNull(err);
                assert.isNotNull(pets);
                assert.isArray(pets);
                assert.equal(pets.length, 1);
                assert.equal(pets[0], pet);
            });
        });
    });
});