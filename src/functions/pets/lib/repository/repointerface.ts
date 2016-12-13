import { Pet } from 'src/functions/pets/model/pet'

export interface RepoInterface {
    type: string;
    fetch(callback: Function): void;
    save(pet: Pet, callback: Function): void;
}