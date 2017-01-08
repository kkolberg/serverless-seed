import { LocalFileRepo, Reader, Writer, TempSync } from "src/functions/storageEx/lib/repository/localFileRepo";
import { Pet } from "src/functions/storageEx/model/pet";
import { FetchCallback } from "src/functions/storageEx/lib/repository/petsRepository";
import { assert } from "chai";

describe("LocalFileRepo", () => {
    describe("#fetch", () => {
        it("should handle error", () => {
            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback({}, null);
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {

            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.isNotNull(err);
                assert.isNull(result);
            });
        });

        it("should return empty if null", () => {
            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback(null, null);
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {

            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.isNull(err);
                assert.equal(result.length, 0);
            });
        });

        it("should return data", () => {
            let pets: Pet[] = [];
            pets.push(<Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            });

            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback(null, JSON.stringify(pets));
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {

            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);

            repo.fetch(<FetchCallback>(err: any, result: Pet[]) => {
                assert.isNull(err);
                assert.equal(result.length, 1);
                assert.equal(result[0].name, pets[0].name);
                assert.equal(result[0].weight, pets[0].weight);
                assert.equal(result[0].price, pets[0].price);
            });
        });
    });

    describe("#save", () => {
        it("should handle fetch error", () => {
            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback({ "from": "reader" }, null);
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {
                callback({ "from": "writer" });
            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);
            let pet = <Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            };
            repo.save(pet, (err: any, result: Pet[]) => {
                assert.isNotNull(err);
                assert.equal(err["from"], "reader");
                assert.isNull(result);
            });
        });

        it("should handle writer error", () => {
            let pets: Pet[] = [];
            pets.push(<Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            });

            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback(null, JSON.stringify(pets));
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {
                callback({ "from": "writer" });
            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);
            let pet = <Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            };
            repo.save(pet, (err: any, result: Pet[]) => {
                assert.isNotNull(err);
                assert.equal(err["from"], "writer");
                assert.isNull(result);
            });
        });

        it("should save", () => {
            let pets: Pet[] = [];
            pets.push(<Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            });

            let reader = <Reader>(filename: string, encoding: string, callback: Function) => {
                callback(null, JSON.stringify(pets));
            };

            let writer = <Writer>(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: Function) => {
                callback(null);
            };

            let temp = <TempSync>{
                openSync: (name: string) => {
                    return { path: "path" };
                }
            };

            let repo = new LocalFileRepo(reader, writer, temp);
            let pet = <Pet>{
                name: "name",
                weight: 12,
                price: 1.2
            };
            repo.save(pet, (err: any, result: Pet[]) => {
                assert.isNull(err);
                assert.isNotNull(result);
                assert.equal(result.length, 2);
            });
        });
    });
});