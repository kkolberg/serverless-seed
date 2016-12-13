import { LocalFileRepo as PetsRepo } from 'src/functions/pets/lib/repository/LocalFileRepo';
import { Pet } from 'src/functions/pets/model/Pet';
import expect = require('expect.js');

describe('PetsRepo', () => {
    it('should do something', () => {
        let repo = new PetsRepo();

        repo.fetch((err: any, result: String) => {
            expect(result.length).to.equal(0);
        });
    });
});