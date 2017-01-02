import { assert } from "chai";
import { BaseConfig } from "src/shared/model/baseConfig";
require("dotenv").config();

describe("BaseConfig", () => {
    before(function () {
        process.env.IS_SERVERLESS = "IS_SERVERLESS";
        process.env.IS_OFFLINE = "IS_SERVERLESS_OFFLINE";
        process.env.LIFECYCLE = "LIFECYCLE";
    });

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
            assert.equal(config.isServerlessOffline, process.env.IS_OFFLINE);
        });

        it("should retrieve URL from ENV", () => {
            assert.equal(config.lifecycle, process.env.LIFECYCLE);
        });
    });

    describe("#info", () => {
        let config: BaseConfig;

        // These tests will use the local execution environment variables in .env
        before(function () {
            config = new BaseConfig();
        });

        it("should return plain obj", () => {
            let info = config.info;
            assert.isNotNull(info);

            assert.equal(config.isServerless, info["isServerless"]);
            assert.equal(config.isServerlessOffline, info["isServerlessOffline"]);
            assert.equal(config.lifecycle, info["lifecycle"]);
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

