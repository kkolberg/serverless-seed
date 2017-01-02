import { assert } from "chai";
import { ResponseHandler } from "src/shared/lib/responseHandler";

describe("ResponseHandler", () => {
    describe("#done", () => {

        let callbackSuccess = (err: any, res: any) => {

            assert.isNull(err);
            assert.equal(typeof res, "object");
            assert.equal(res.statusCode, "200");
        };

        let callbackError = (err: any, res: any) => {
            assert.isNull(err);
            assert.equal(typeof res, "object");
            assert.equal(res.statusCode, "400");
        };

        it("should return a clean response when passed an error", () => {
            let resp = new ResponseHandler();
            resp.done(new Error("An error occurred"), null, callbackError);
        });

        it("should return success when passed a response", () => {
            let resp = new ResponseHandler();
            resp.done(null, { "message": "something happened" }, callbackSuccess);
        });

    });
});

