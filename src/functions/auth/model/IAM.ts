import {PolicyDocument} from 'src/functions/auth/model/PolicyDocument'

export interface IAM{
    principalId: string;
    policyDocument:PolicyDocument;
}