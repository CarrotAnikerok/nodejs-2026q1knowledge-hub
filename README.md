# Knowledge Hub

Hello! Some additional info about this repo and its differences from original one:

- according to the discord channel, in question to admins, it is okay for us to remove test folder from `lint` command
- added `"endOfLine":"auto"` to .prettierrc so it wont be red for lf|crlf|cr for different OCes
- added `tsconfigRootDir: __dirname,` line to .eslintrc.js to help it find tsconfig in this folder without problems
- added `tsconfig.build.tsbuildinfo` and `env` to .gitignore
- upgraded @nestjs/jwt, @nestjs/swagger, class-validator, @types/jest in package.json. it works as it supposed on my machine.

## Docker

Final application image size: 235.96мб
Docker Hub link: https://hub.docker.com/repository/docker/carrotanikerok/nodejs-2026q1knowledge-hub-web/general

####Results of security scan:

39 vulnerabilities found in 16 packages
  LOW       2   
  MEDIUM    19  
  HIGH      18  
  CRITICAL  0   

No critical vulnerabilities!

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Start

```
git clone https://github.com/CarrotAnikerok/nodejs-2026q1knowledge-hub.git
cd nodejs-2026q1knowledge-hub
npm install
```

## Running application

```
npm start
```

To run in dev mode:

```
npm run start:dev
```

To build:

```
npm run build
```

To run on production mode:

```
npm run start:prod
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

## Using

After running, you can test endpoints for:

- /user
- /article
- /comment
- /category

You can see and test it in OpenAPI documentation from upper link.

From special, toy can filter articles with queries by status, categoryId and tag.

Examples:
- /article?status=draft
- /article?tag=nodejs&published=draft

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
