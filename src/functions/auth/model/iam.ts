import {PolicyDocument} from "src/functions/auth/model/policyDocument";

export interface IAM {
    principalId: string;
    policyDocument: PolicyDocument;
}