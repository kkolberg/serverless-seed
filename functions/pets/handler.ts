import { blah } from "../lib/blah";
import { repo as repoFunc } from "./lib/repository/repo";
var repo = repoFunc(blah);

export function hello(event: any, context: any, callback: any) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'This message is writen by TypeScript.',
      input: event
    })
  };
  
  callback(null, response);
}