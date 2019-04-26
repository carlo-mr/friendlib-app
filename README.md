# friendlib-app [![Build Status](https://dev.azure.com/carlo-mr/friendlib-app/_apis/build/status/carlo-mr.friendlib-app?branchName=master)](https://dev.azure.com/carlo-mr/friendlib-app/_build/latest?definitionId=1&branchName=master) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
Friendlib Ionic 4 App


# Run

`ionic serve`

# Tests

`ng test`

## Pact

`ng run app:pact`

or

`npm run pact` 


## Using pact mock server with Docker

`docker pull pactfoundation/pact-stub-server`

`docker run -t -p 8080:8080 -v "$(pwd)/pacts/:/app/pacts" pactfoundation/pact-stub-server -p 8080 -d pacts`

# Helpful Links

Setup Jest and Ionic:
- [How to setup Jest in an Ionic 4 project](https://medium.com/@gregor.woiwode/how-to-setup-jest-in-an-ionic-4-project-ff1e5b72dd79)
- [Ionic 4 template running tests with Jest](https://github.com/GregOnNet/ionic-4-jest-setup)

Setup Jest and Pact: 
- [Jest Angular Example](https://github.com/McKratt/jest-angular-example)
- [Test with Jest AND Angular not end correctly](https://github.com/pact-foundation/pact-js/issues/213#issuecomment-423175705)
