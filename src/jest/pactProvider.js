const path = require('path');
const Pact = require('../../node_modules/@pact-foundation/pact/pact').Pact;

global.port = 8080;
global.provider = new Pact({
  port: global.port,
  log: path.resolve(process.cwd(), 'target', 'logs', 'mockserver-integration.log'),
  dir: path.resolve(process.cwd(), 'target', 'pacts'),
  spec: 2,
  cors: true,
  logLevel: "debug",
  pactfileWriteMode: 'update',
  consumer: 'friendlib-app',
  provider: 'book-search',
});
