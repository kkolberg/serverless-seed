import { Pet } from "src/functions/petCache/model/pet";

export interface Cache {
    put(pet: Pet, callback: PutCallback): void;
}

export type PutCallback = (err: any, data: Pet) => void;