import { PetsRepository, SaveCallback, FetchCallback } from "src/functions/storageEx/lib/repository/petsRepository";
import { Pet } from "src/functions/storageEx/model/pet";

import * as fs from "fs";

export type Reader = (filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void) => void;
export type Writer = (filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void) => void;
export interface TempSync {
    openSync: (name: String) => { path: String };
};

// This is a dummy class design to local dev without having to call s3
export class LocalFileRepo implements PetsRepository {
    private reader: Reader;
    private writer: Writer;
    private temp: TempSync;

    type: string = "LocalFileRepo";

    constructor(reader?: Reader, writer?: Writer, temp?: TempSync) {

        this.reader = reader || fs.readFile;
        this.writer = writer || fs.writeFile;

        this.temp = temp || require("temp").track();
    }

    getFile(): string {
        if (process.env.petsFile) {
            return process.env.petsFile;
        }

        process.env.petsFile = this.temp.openSync("tmpPets").path;
        return process.env.petsFile;
    }

    fetch(callback: FetchCallback) {
        this.reader(this.getFile(), "utf8", (err: any, data: any) => {
            if (err) {
                return callback(err, null);
            }

            if (!data) {
                return callback(null, []);
            }

            callback(null, <Array<Pet>>JSON.parse(data));
        });

    }

    save(pet: Pet, callback: SaveCallback) {

        this.fetch((err: any, pets: Array<Pet>) => {
            if (err) {
                return callback(err, null);
            }

            pets.push(pet);

            this.writer(this.getFile(), JSON.stringify(pets), "utf8", (err: any) => {
                if (err) {
                    return callback(err, null);
                }

                return callback(null, pets);
            });
        });

    }
}