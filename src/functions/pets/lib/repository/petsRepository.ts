import { Pet } from "src/functions/pets/model/pet";

export interface PetsRepository {
    type: string;
    fetch(callback: FetchCallback): void;
    save(pet: Pet, callback: SaveCallback): void;
}

export type FetchCallback = (err: any, data: Pet[]) => void;
export type SaveCallback = (err: any, data: Pet[]) => void;