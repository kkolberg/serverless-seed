export class BaseConfig {
    get isServerless(): string {
        return process.env.IS_SERVERLESS;
    }

    get isServerlessOffline(): string {
        return process.env.IS_OFFLINE;
    }
}