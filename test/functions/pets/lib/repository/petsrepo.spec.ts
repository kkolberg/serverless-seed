import * as Chai from 'chai';
import { PetsRepo } from 'src/functions/pets/lib/repository/PetsRepo';
const assert = Chai.assert;

describe('PetsRepo', () => {
    it('should do something', () => {
        let repo = new PetsRepo((meh: String, callback: Function) => {
            callback(null, "blah said " + meh);
        });

        repo.something((err: any, result: String) => {
            assert.isNull(err);
            assert.isNotNull(result);
        });
    });
});