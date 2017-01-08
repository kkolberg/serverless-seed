import { assert } from "chai";
import { PetsLogic } from "src/functions/storageEx/lib/petsLogic";
import { Pet } from "src/functions/storageEx/model/pet";

describe("PetsLogic", () => {
    it("should call fetch", (done) => {
        let repo = {
            type: "mock",
            fetch(callback: Function) {
                let pet = {
                    "name": "cat",
                    "price": 1,
                    "weight": 2
                };

                callback(null, [pet]);
            },
            save(pet: Pet, callback: Function) {

            }
        };

        let resp = {
            done(err: any, res: any, call: Function) {
                call(err, res);
            }
        };

        let cb = function (err: any, res: any) {
            assert.equal(res.pets.length, 1);
            assert.equal(res.pets[0].name, "cat");
            done();
        };


        let petsLogic = new PetsLogic(repo, resp);
        petsLogic.handle({ "httpMethod": "GET" }, {}, cb);
    });
});