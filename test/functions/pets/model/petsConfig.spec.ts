import { assert } from "chai";
import { PetsConfig } from "src/functions/pets/model/petsConfig";

describe("PetsConfig", () => {
    before(function () {
        process.env.PETS_BUCKET = "PETS_BUCKET";
        process.env.PETS_BUCKET_KEY = "PETS_BUCKET_KEY";
    });

    describe("#properties", () => {
        let config: PetsConfig;

        // These tests will use the local execution environment variables in .env
        before(function () {
            config = new PetsConfig();
        });

        it("should retrive s3BucketName from ENV", () => {
            assert.equal(config.s3BucketName, process.env.PETS_BUCKET);
        });

        it("should retrive s3BucketKey from ENV", () => {
            assert.equal(config.s3BucketKey, process.env.PETS_BUCKET_KEY);
        });
    });

    describe("#info", () => {
        let config: PetsConfig;

        // These tests will use the local execution environment variables in .env
        before(function () {
            config = new PetsConfig();
        });

        it("should return plain obj", () => {
            let info = config.info;
            assert.isNotNull(info);

            assert.equal(config.s3BucketName, info["s3BucketName"]);
            assert.equal(config.s3BucketKey, info["s3BucketKey"]);
        });

        it("it should work with json.stringify", () => {
            let info = config.info;
            assert.isNotNull(info);

            let json = JSON.stringify(info);
            assert.isAbove(json.length, 2);
            assert.notEqual(json, "{}");
        });
    });
});

