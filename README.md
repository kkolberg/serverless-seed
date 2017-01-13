# serverless-seed

### Local Setup

See [Local Setup](https://github.com/gastate/serverless-seed/wiki/Local-Setup)

### Getting started

After cloning run the below commands to get everything installed:

```sh
npm run globals
npm install
```

### Basic commands

To build:

```sh
npm run build
```

To run service (it will start in debug mode):

```sh
npm run start
```

To test:

```sh
npm run test
```

To test and debug:

```sh
npm run testdebug
```

To generate code coverage (reports will be under the coverage folder):

```sh
npm run cover
```

To deploy:

```sh
npm run deploy [-- --stage <stage>]
```

### VSCode Setup

for in-line linting help, install the plugin TSLint for Visual Studio Code

for debugging add the following lines to the .vscode/launch.json file:

```json
"sourceMaps": true,
"outDir": "${workspaceRoot}/build",
```

### Importing

When doing an import and creating files, use camel casing.

Say you have a file src/shared/lib/responseHandler that you want to import.

Wrong:

```sh
import { ResponseHandler } from 'src/shared/lib/ResponseHandler';
```

Correct:

```sh
import { ResponseHandler } from 'src/shared/lib/responseHandler';
```

### Env Variables

#### Local

When working locally, dotenv will pull in .env file.

For example:

```
IS_SERVERLESS=false
```

Will show up under process.env (which contains all values as strings)

```js
process.env.IS_SERVERLESS === "false"
```

#### Deploying

Serverless will set environment variables (either globally or per lambda).

Put values in deploy.env.yml

```yml
IS_SERVERLESS: true
```

And reference in serverless.yml

```yml
environment:
    IS_SERVERLESS: ${file(deploy.env.yml):IS_SERVERLESS}
```


### DynamoDB

To use dynamodb locally first run the below command

```sh
sls dynamodb install
```

Then run the following in a seperate terminal before starting serverless

```sh
sls dynamodb start
```

Don't forget to stop dynamodb or kill the shell it is running in, when finished.
