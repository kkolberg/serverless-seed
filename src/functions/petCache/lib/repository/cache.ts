import { Pet } from "src/functions/petCache/model/pet";

export interface Cache {
    put(pet: Pet, callback: PutCallback): void;
    list(callback: ListCallback): void;
}

export type PutCallback = (err: any) => void;
export type ListCallback = (err: any, pets: Pet[]) => void;