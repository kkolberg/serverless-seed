import { assert } from "chai";
import { BaseConfig } from "src/shared/model/baseConfig";

describe("BaseConfig", () => {
    describe("#properties", () => {
        let config: BaseConfig;

        // These tests will use the local execution environment variables in .env
        before(function () {
            config = new BaseConfig();
        });

        it("should retrive banner user from ENV", () => {
            assert.equal(config.isServerless, process.env.IS_SERVERLESS);
        });

        it("should retrive banner PW from ENV", () => {
            assert.equal(config.isServerlessOffline, process.env.IS_SERVERLESS_OFFLINE);
        });

        it("should retrieve URL from ENV", () => {
            assert.equal(config.lifecycle, process.env.LIFECYCLE);
        });
    });
});

