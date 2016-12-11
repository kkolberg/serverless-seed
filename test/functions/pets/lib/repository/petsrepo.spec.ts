import { PetsRepo } from '../../../../../src/functions/pets/lib/repository/petsrepo';
import expect = require('expect.js');

describe('PetsRepo', () => {
    it('should do something', () => {
        let repo = new PetsRepo({
            something: (callback: Function) => {
                callback(null, "blah said ");
            }
        });

        repo.something((err: any, result: String) => {
            expect(result).to.contain("blah said ");
        });
    });
});