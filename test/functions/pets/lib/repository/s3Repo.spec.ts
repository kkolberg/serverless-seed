import { S3Repo } from "src/functions/pets/lib/repository/s3Repo";
import { PetsRepository } from "src/functions/pets/lib/repository/petsRepository";
import { Pet } from "src/functions/pets/model/pet";
import { FetchCallback } from "src/functions/pets/lib/repository/petsRepository";
import { SaveCallback } from "src/functions/pets/lib/repository/petsRepository";
import { PetsConfig } from "src/functions/pets/model/petsConfig";
import { assert } from "chai";

describe("s3Repo", () => {
    let object = {};
    let aws = {
        S3: function () {
            return object;
        }
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

        it("should return nothing", () => {
            let repo = <PetsRepository>new S3Repo(new PetsConfig(), aws);

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.equal(result.length, 0);
            });
        });

        it("should return a pet", () => {
            let repo = <PetsRepository>new S3Repo(new PetsConfig(), aws);
            let pet = <Pet>{
                name: "save",
                weight: 10,
                price: 1
            };

            let saveCb = <SaveCallback>(err: any, saveResult: Pet[]) => {
                repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                    assert.equal(result.length, 1);
                    assert.equal(result[1], pet);
                });
            };

            repo.save(pet, saveCb);
        });
    });

    describe("#save", () => {
        before(function () {
            process.env.petsFile = "";
        });

        it("should save", () => {
            let repo = <PetsRepository>new S3Repo(new PetsConfig(), aws);
            let pet = <Pet>{
                name: "save",
                weight: 10,
                price: 1
            };

            let saveCb = <SaveCallback>(err: any, saveResult: Pet[]) => {
                assert.equal(saveResult.length, 1);
                assert.equal(saveResult[1], pet);

                repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                    assert.equal(result.length, 1);
                    assert.equal(result[1], pet);
                });
            };

            repo.save(pet, saveCb);
        });

        it("should append", () => {
            let repo = <PetsRepository>new S3Repo(new PetsConfig(), aws);
            let pet = <Pet>{
                name: "one",
                weight: 10,
                price: 1
            };

            let petTwo = <Pet>{
                name: "two",
                weight: 20,
                price: 2
            };

            let prep = <SaveCallback>(err: any, result: Pet[]) => {
                repo.save(petTwo, saveCb);
            };

            let saveCb = <SaveCallback>(err: any, result: Pet[]) => {
                assert.equal(result.length, 2);
                assert.equal(result[1], pet);
                assert.equal(result[2], petTwo);
            };

            repo.save(pet, prep);
        });
    });
});