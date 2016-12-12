import { Pet } from '../../model/pet'

export interface RepoInterface {
    fetch(callback: Function): void;
    save(pet: Pet, callback: Function): void;
}