import { BaseConfig } from "src/shared/model/baseConfig";

export class PetsConfig extends BaseConfig {

    get s3BucketName(): string {
        return process.env.PETS_BUCKET;
    }

    get s3BucketKey(): string {
        return process.env.PETS_BUCKET_KEY;
    }
}