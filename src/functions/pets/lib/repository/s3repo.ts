import { PetsRepository } from 'src/functions/pets/lib/repository/PetsRepository';
import { Pet } from 'src/functions/pets/model/Pet';
import { PetsConfig } from 'src/functions/pets/model/PetsConfig';

export class S3Repo implements PetsRepository {
    private aws: any;
    private config: PetsConfig;

    type: string = "s3Repo";

    constructor(config: PetsConfig, aws: any) {
        this.aws = aws;
        this.config = config;
    }

    createKey(callback: Function) {
        new this.aws.S3().putObject({
            Bucket: this.config.s3BucketName,
            Key: this.config.s3BucketKey,
            Body: JSON.stringify([])
        }, callback);
    }

    fetch(callback: Function) {
        new this.aws.S3().getObject({
            Bucket: this.config.s3BucketName,
            Key: this.config.s3BucketKey
        }, (err: any, data: any) => {
            if (err && err.code === 'NoSuchKey') {
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

            return callback(null, <Array<Pet>>JSON.parse(data.Body));
        });
    }

    save(pet: Pet, callback: Function) {
        var self = this;
        let put = function (err: any, pets: Pet[]) {

            if (err) {
                return callback(err, null);
            }

            pets.push(pet);

            new self.aws.S3().putObject({
                Bucket: self.config.s3BucketName,
                Key: self.config.s3BucketKey,
                Body: JSON.stringify(pets)
            }, (err: any) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, pets);
            });
        }

        this.fetch(put);
    }
}