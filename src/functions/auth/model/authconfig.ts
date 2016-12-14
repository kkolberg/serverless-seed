import { BaseConfig } from 'src/shared/model/BaseConfig';

export class AuthConfig extends BaseConfig {
    get gluUrl(): string {
        return process.env.GLU_URL;
    }
}