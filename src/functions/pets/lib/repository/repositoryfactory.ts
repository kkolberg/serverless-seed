import AWS = require('aws-sdk');
import { PetsRepository } from 'src/functions/pets/lib/repository/PetsRepository';
import { LocalFileRepo } from 'src/functions/pets/lib/repository/LocalFileRepo';
import { S3Repo } from 'src/functions/pets/lib/repository/S3Repo';

export class RepositoryFactory {
    getRepository(): PetsRepository {
        if (process.env.IS_SERVERLESS) {
            return new S3Repo(AWS);
        }

        return new LocalFileRepo();
    }
}