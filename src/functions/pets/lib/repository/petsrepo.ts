import {RepoInterface} from './RepoInterface';
import {Blah} from '../../../../lib/Blah';

export class PetsRepo implements RepoInterface {
    private blah: any;

    constructor(blah: Blah) {
        this.blah = blah;
    }

    something(callback: Function) {
        this.blah.something(callback);
    }
}