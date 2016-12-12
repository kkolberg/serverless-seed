import { RepoInterface } from './repointerface';
import { Pet } from '../../model/pet';

export class PetsRepo implements RepoInterface {
    private pets: Pet[] = [];

    fetch(callback: Function) {
        callback(null, this.pets);
    }

    save(pet: Pet, callback: Function) {
        this.pets.push(pet);
        callback(null, this.pets);
    }
}