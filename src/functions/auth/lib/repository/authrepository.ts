export class AuthRepository {

    fetch(token: string, methodArn: string, callback: Function) {

        if (token == "cat") {
            //call auth
            callback(null, {
                "principalId": "e9ef05797d33474c9121010599eeba4b",
                "policyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [{
                        "Action": "execute-api:Invoke",
                        "Effect": "Allow", "Resource": "*"
                    }]
                }
            });
        } else {
            callback(null, {
                "principalId": "e9ef05797d33474c9121010599eeba4b",
                "policyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [{
                        "Action": "execute-api:Invoke",
                        "Effect": "Deny", "Resource": methodArn
                    }]
                }
            });
        }
    };
}
