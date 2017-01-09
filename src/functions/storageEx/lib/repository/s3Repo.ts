import { PetsRepository, FetchCallback, SaveCallback } from "src/functions/storageEx/lib/repository/petsRepository";
import { Pet } from "src/functions/storageEx/model/pet";
import { PetsConfig } from "src/functions/storageEx/model/petsConfig";
import { S3, Request } from "aws-sdk";
import { AWSError } from "aws-sdk/lib/error";

export interface S3Storage {
    putObject(params: S3.Types.PutObjectRequest, callback?: (err: AWSError, data: S3.Types.PutObjectOutput) => void): Request<S3.Types.PutObjectOutput, AWSError>;
    getObject(params: S3.Types.GetObjectRequest, callback?: (err: AWSError, data: S3.Types.GetObjectOutput) => void): Request<S3.Types.GetObjectOutput, AWSError>;
};

export class S3Repo implements PetsRepository {
    private s3: S3Storage;
    private config: PetsConfig;

    type: string = "s3Repo";

    constructor(config: PetsConfig, s3: S3Storage) {
        this.s3 = s3;
        this.config = config;
    }

    createKey(callback: (err: any, data: S3.Types.PutObjectOutput) => void) {
        this.s3.putObject({
            Bucket: this.config.s3BucketName,
            Key: this.config.s3BucketKey,
            Body: JSON.stringify([])
        }, callback);
    }

    fetch(callback: FetchCallback) {
        this.s3.getObject({
            Bucket: this.config.s3BucketName,
            Key: this.config.s3BucketKey
        }, (err: any, data: S3.Types.GetObjectOutput) => {
            if (err && err.code === "NoSuchKey") {
                this.createKey((err: any) => {
                    if (err) {
                        return callback(err, null);
                    }

                    return this.fetch(callback);
                });
                return;
            }

            if (err) {
                return callback(err, null);
            }

            if (!data.Body) {
                return callback(null, []);
            }

            return callback(null, <Array<Pet>>JSON.parse(data.Body.toString()));
        });
    }

    save(pet: Pet, callback: SaveCallback) {
        let self = this;
        let put = function (err: any, pets: Pet[]) {

            if (err) {
                return callback(err, null);
            }

            pets.push(pet);

            self.s3.putObject({
                Bucket: self.config.s3BucketName,
                Key: self.config.s3BucketKey,
                Body: JSON.stringify(pets)
            }, (err: any) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, pets);
            });
        };

        this.fetch(put);
    }
}