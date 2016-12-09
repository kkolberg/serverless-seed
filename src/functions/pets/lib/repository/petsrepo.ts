export class PetsRepo {
    private blah: any;
    constructor(blah: any) {
        this.blah = blah;
    }
    something(callback: Function) {
        this.blah("CatDog", callback);
    }
}