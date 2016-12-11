import { PetsRepo } from '../../../../../src/functions/pets/lib/repository/petsrepo';
import expect = require('expect.js');

describe('PetsRepo', () => {
    it('should do something', () => {
        let repo = new PetsRepo((meh: String, callback: Function) => {
            callback(null, "blah said " + meh);
        });

        repo.something((err: any, result: String) => {
            expect(result).to.contain("CatDog");
        });
    });
});