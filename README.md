# friendlib-app [![Build Status](https://travis-ci.com/carlo-mr/friendlib-app.svg?branch=master)](https://travis-ci.com/carlo-mr/friendlib-app) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
Friendlib Ionic 4 App


# Run

`ionic serve`

## Using pact mock server with Docker

`docker pull pactfoundation/pact-stub-server`

`docker run -t -p 8080:8080 -v "$(pwd)/pacts/:/app/pacts" pactfoundation/pact-stub-server -p 8080 -d pacts`
