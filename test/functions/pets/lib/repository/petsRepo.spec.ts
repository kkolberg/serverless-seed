import { LocalFileRepo as PetsRepo } from "src/functions/pets/lib/repository/localFileRepo";
import { Pet } from "src/functions/pets/model/pet";
import { FetchCallback } from "src/functions/pets/lib/repository/petsRepository";
import { assert } from "chai";

describe("PetsRepo", () => {
    it("should do something", () => {
        let repo = new PetsRepo();

        repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
            assert.equal(result.length, 0);
        });
    });
});