# serverless-seed

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

### VSCode Debugging
add the following lines to the .vscode/launch.json file:
```json
"sourceMaps": true,
"outDir": "${workspaceRoot}/build",
```
