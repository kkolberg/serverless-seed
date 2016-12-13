import expect = require('expect.js');
import { PetsLogic } from '../../../../src/functions/pets/lib/petslogic';
import { Pet } from '../../../../src/functions/pets/model/pet';

describe('PetsLogic', () => {
    it('should call fetch', () => {
        let repo = {
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
        let respHandler = {
            done(err: any, res: any, callback: Function) {
                callback(err, res);
            }
        };

        let cb = function (err: any, res: any) {
            expect(res.length).to.equal(1);
            expect(res[0].name).to.equal("cat");
        };

        let petsLogic = new PetsLogic(repo, respHandler);
        petsLogic.handle({ 'httpMethod': 'GET' }, {}, cb);
    });
});