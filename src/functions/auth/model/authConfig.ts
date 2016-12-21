import { BaseConfig } from "src/shared/model/baseConfig";

export class AuthConfig extends BaseConfig {
    get gluUrl(): string {
        return process.env.GLU_URL;
    }
}