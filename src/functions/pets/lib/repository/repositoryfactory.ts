import AWS = require('aws-sdk');
import { PetsRepository } from 'src/functions/pets/lib/repository/PetsRepository';
import { LocalFileRepo } from 'src/functions/pets/lib/repository/LocalFileRepo';
import { S3Repo } from 'src/functions/pets/lib/repository/S3Repo';
import { PetsConfig } from 'src/functions/pets/model/PetsConfig';

export class RepositoryFactory {
    private config: PetsConfig;

    constructor(config: PetsConfig) {
        this.config = config;
    }

    getRepository(): PetsRepository {
        if (this.config.isServerless) {
            return new S3Repo(AWS);
        }

        return new LocalFileRepo();
    }
}