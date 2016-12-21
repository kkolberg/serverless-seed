import { BaseConfig } from "src/shared/model/baseconfig";

export class AuthConfig extends BaseConfig {
    get gluUrl(): string {
        return process.env.GLU_URL;
    }
}