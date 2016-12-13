import { RepoInterface } from 'src/functions/pets/lib/repository/repointerface';
import { Pet } from 'src/functions/pets/model/pet';

import fs = require('fs');
var temp = require("temp").track();

export class LocalFileRepo implements RepoInterface {
    private name: string = "tempPets";
    type: string =  "LocalFileRepo";

    fetch(callback: Function) {
        
        temp.open(this.name, (err: any, info: any) => {
            if (err) {
                return callback(err, null);
            }

            fs.readFile(info.path, (err: any, data: any) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, <Array<Pet>>JSON.parse(data));
            });
        });
    }

    save(pet: Pet, callback: Function) {

        this.fetch((err: any, pets: Array<Pet>) => {
            if (err) {
                return callback(err, null);
            }

            temp.open(this.name, (err: any, info: any) => {
                if (err) {
                    return callback(err, null);
                }

                pets.push(pet);

                fs.writeFile(info.path, pets);
            });
        });
    }
}