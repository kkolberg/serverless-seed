export class BaseConfig {

    get isServerless(): string {
        return process.env.IS_SERVERLESS;
    }

    public get isServerlessOffline(): string {
        return process.env.IS_OFFLINE;
    }

    public get lifecycle(): string {
        return process.env.LIFECYCLE;
    }

    get info(): { [key: string]: string } {
        let info: { [key: string]: string } = {};
        let self = this;

        let obj = Object.getPrototypeOf(this);
        while (obj) {
            Object.getOwnPropertyNames(obj).forEach((key) => {
                if (key === "info" || key === "constructor" || typeof (<any>self)[key] !== "string") {
                    return;
                }
                info[key] = (<any>self)[key];
            });

            obj = Object.getPrototypeOf(obj);
        }

        return info;
    }
}