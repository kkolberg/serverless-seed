import { S3Repo, S3Storage } from "src/functions/storageEx/lib/repository/s3Repo";
import { Pet } from "src/functions/storageEx/model/pet";
import { PetsRepository, SaveCallback, FetchCallback } from "src/functions/storageEx/lib/repository/petsRepository";
import { PetsConfig } from "src/functions/storageEx/model/petsConfig";
import { assert } from "chai";
import { S3, Request } from "aws-sdk";
import { AWSError } from "aws-sdk/lib/error";

describe("s3Repo", () => {
    let s3 = <S3Storage>{

    };


    before(function () {
        process.env.PETS_BUCKET = "bucket";
        process.env.PETS_BUCKET_KEY = "key";
    });

    describe("#fetch", () => {
        it("should return type", () => {
            let repo = <PetsRepository>new S3Repo(null, null);
            assert.equal(repo.type, "s3Repo");
        });
    });

    describe("#fetch", () => {

        it("should create key if missing", () => {
            let calledPut = false;
            s3.putObject = (params: S3.Types.PutObjectRequest, callback?: (err: AWSError, data: S3.Types.PutObjectOutput) => void): Request<S3.Types.PutObjectOutput, AWSError> => {
                calledPut = true;
                assert.isNotNull(params);
                assert.equal(params.Bucket, process.env.PETS_BUCKET);
                assert.equal(params.Key, process.env.PETS_BUCKET_KEY);
                assert.equal(params.Body, JSON.stringify([]));
                return;
            };

            s3.getObject = (params: S3.Types.GetObjectRequest, callback?: (err: AWSError, data: S3.Types.GetObjectOutput) => void): Request<S3.Types.GetObjectOutput, AWSError> => {
                if (!calledPut) {
                    callback({
                        code: "NoSuchKey",
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

                    return;
                }
                callback(null, { Body: null });
                return;
            };

            let repo = <PetsRepository>new S3Repo(new PetsConfig(), s3);

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.isNotNull(err);
                assert.isTrue(calledPut);
                assert.equal(result.length, 0);
            });
        });

        it("should return a pet", () => {
            let calledPut = false;
            let pet = <Pet>{
                name: "save",
                weight: 10,
                price: 1
            };
            s3.putObject = (params: S3.Types.PutObjectRequest, callback?: (err: AWSError, data: S3.Types.PutObjectOutput) => void): Request<S3.Types.PutObjectOutput, AWSError> => {
                calledPut = true;
                assert.isNotNull(params);
                assert.equal(params.Bucket, process.env.PETS_BUCKET);
                assert.equal(params.Key, process.env.PETS_BUCKET_KEY);
                assert.equal(params.Body, JSON.stringify([]));
                return;
            };

            s3.getObject = (params: S3.Types.GetObjectRequest, callback?: (err: AWSError, data: S3.Types.GetObjectOutput) => void): Request<S3.Types.GetObjectOutput, AWSError> => {
                if (!calledPut) {
                    callback({
                        code: "NoSuchKey",
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

                    return;
                }
                callback(null, {
                    Body: {
                        toString: function () {
                            let list: Pet[] = [];
                            list.push(pet);
                            return JSON.stringify(list);
                        }
                    }
                });
                return;
            };

            let repo = <PetsRepository>new S3Repo(new PetsConfig(), s3);

            let saveCb = <SaveCallback>(err: any, saveResult: Pet[]) => {
                repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                    assert.equal(result.length, 1);
                    assert.equal(result[1], pet);
                });
            };

            repo.save(pet, saveCb);
        });
    });

    // describe("#save", () => {
    //     before(function () {
    //         process.env.petsFile = "";
    //     });

    //     it("should save", () => {
    //         let repo = <PetsRepository>new S3Repo(new PetsConfig(), s3);
    //         let pet = <Pet>{
    //             name: "save",
    //             weight: 10,
    //             price: 1
    //         };

    //         let saveCb = <SaveCallback>(err: any, saveResult: Pet[]) => {
    //             assert.equal(saveResult.length, 1);
    //             assert.equal(saveResult[1], pet);

    //             repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
    //                 assert.equal(result.length, 1);
    //                 assert.equal(result[1], pet);
    //             });
    //         };

    //         repo.save(pet, saveCb);
    //     });

    //     it("should append", () => {
    //         let repo = <PetsRepository>new S3Repo(new PetsConfig(), s3);
    //         let pet = <Pet>{
    //             name: "one",
    //             weight: 10,
    //             price: 1
    //         };

    //         let petTwo = <Pet>{
    //             name: "two",
    //             weight: 20,
    //             price: 2
    //         };

    //         let prep = <SaveCallback>(err: any, result: Pet[]) => {
    //             repo.save(petTwo, saveCb);
    //         };

    //         let saveCb = <SaveCallback>(err: any, result: Pet[]) => {
    //             assert.equal(result.length, 2);
    //             assert.equal(result[1], pet);
    //             assert.equal(result[2], petTwo);
    //         };

    //         repo.save(pet, prep);
    //     });
    // });
});