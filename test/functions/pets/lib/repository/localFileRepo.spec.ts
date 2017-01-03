import { LocalFileRepo } from "src/functions/pets/lib/repository/localFileRepo";
import { PetsRepository } from "src/functions/pets/lib/repository/petsRepository";
import { Pet } from "src/functions/pets/model/pet";
import { FetchCallback } from "src/functions/pets/lib/repository/petsRepository";
import { SaveCallback } from "src/functions/pets/lib/repository/petsRepository";
import { assert } from "chai";

describe("LocalFileRepo", () => {

    describe("#fetch", () => {
        it("should return type", () => {
            let repo = <PetsRepository>new LocalFileRepo();
            assert.equal(repo.type, "LocalFileRepo");
        });
    });

    describe("#fetch", () => {
        before(function () {
            process.env.petsFile = "";
        });

        it("should return nothing", () => {
            let repo = <PetsRepository>new LocalFileRepo();

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.equal(result.length, 0);
            });
        });

        it("should return a pet", () => {
            let repo = <PetsRepository>new LocalFileRepo();
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
            let repo = <PetsRepository>new LocalFileRepo();
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
            let repo = <PetsRepository>new LocalFileRepo();
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