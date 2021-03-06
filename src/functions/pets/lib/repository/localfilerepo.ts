import { PetsRepository } from 'src/functions/pets/lib/repository/PetsRepository';
import { Pet } from 'src/functions/pets/model/Pet';

import fs = require('fs');
var temp = require("temp").track();

//This is a dummy class design to local dev without having to call s3
export class LocalFileRepo implements PetsRepository {

    type: string = "LocalFileRepo";

    getFile(): string {
        if (process.env.petsFile) {
            return process.env.petsFile;
        }

        process.env.petsFile = temp.openSync("tmpPets").path;
        return process.env.petsFile;
    }

    fetch(callback: Function) {
        fs.readFile(this.getFile(), 'utf8', (err: any, data: any) => {
            if (err) {
                return callback(err, null);
            }

            if (!data) {
                return callback(null, []);
            }

            callback(null, <Array<Pet>>JSON.parse(data));
        });

    }

    save(pet: Pet, callback: Function) {

        this.fetch((err: any, pets: Array<Pet>) => {
            if (err) {
                return callback(err, null);
            }

            pets.push(pet);

            fs.writeFile(this.getFile(), JSON.stringify(pets), 'utf8', (err: any) => {
                callback(err, pets);
            });
        });

    }
}