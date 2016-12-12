import {RepoInterface} from './repointerface';

export class PetsRepo implements RepoInterface {
    private blah: any;

    constructor(blah: any) {
        this.blah = blah;
    }

    something(callback: Function) {
        this.blah.something(callback);
    }
}