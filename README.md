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
