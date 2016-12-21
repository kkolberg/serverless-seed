import { Statement } from "src/functions/auth/model/statement";
export interface PolicyDocument {
    Version: string;
    Statement: Statement[];
}