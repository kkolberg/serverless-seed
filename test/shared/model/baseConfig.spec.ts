import expect = require("expect.js");
import { BaseConfig } from "src/shared/model/baseConfig";

describe("BaseConfig", () => {
    describe("#properties", () => {
        let config: BaseConfig;

        // These tests will use the local execution environment variables in .env
        before(function(){
             config = new BaseConfig();
        });

        it("should retrive banner user from ENV", () => {
            expect(config.isServerless).to.equal(process.env.IS_SERVERLESS);
        });

        it("should retrive banner PW from ENV", () => {
            expect(config.isServerlessOffline).to.equal(process.env.IS_SERVERLESS_OFFLINE);
        });

        it("should retrieve URL from ENV", () => {
            expect(config.lifecycle).to.equal(process.env.LIFECYCLE);
        });
    });
});

