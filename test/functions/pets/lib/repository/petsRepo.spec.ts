import { LocalFileRepo as PetsRepo } from "src/functions/pets/lib/repository/localFileRepo";
import { Pet } from "src/functions/pets/model/pet";
import { FetchCallback } from "src/functions/pets/lib/repository/petsRepository";
import expect = require("expect.js");

describe("PetsRepo", () => {
    it("should do something", () => {
        let repo = new PetsRepo();

        repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
            expect(result.length).to.equal(0);
        });
    });
});