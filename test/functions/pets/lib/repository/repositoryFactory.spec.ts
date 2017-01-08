import { assert } from "chai";
import { RepositoryFactory } from "src/functions/pets/lib/repository/repositoryFactory";
import { PetsConfig } from "src/functions/pets/model/petsConfig";

describe("PetsRepo", () => {
    it("should return local", () => {
        process.env.IS_SERVERLESS = "false";
        let config = new PetsConfig();
        let factory = new RepositoryFactory(config);

        let repo = factory.getRepository();
        assert.isNotNull(repo);
        assert.equal(repo.type, "LocalFileRepo");
    });

    it("should return s3", () => {
        process.env.IS_SERVERLESS = "true";
        let config = new PetsConfig();
        let factory = new RepositoryFactory(config);

        let repo = factory.getRepository();
        assert.isNotNull(repo);
        assert.equal(repo.type, "s3Repo");
    });
});