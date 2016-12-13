import { Pet } from 'src/functions/pets/model/pet'

export interface PetsRepository {
    type: string;
    fetch(callback: Function): void;
    save(pet: Pet, callback: Function): void;
}