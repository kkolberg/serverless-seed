import {PolicyDocument} from "src/functions/auth/model/policydocument";

export interface IAM {
    principalId: string;
    policyDocument: PolicyDocument;
}