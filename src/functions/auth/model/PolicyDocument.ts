import { Statement } from 'src/functions/auth/model/Statement'
export interface PolicyDocument {
    Version: string;
    Statement: Statement[]
}