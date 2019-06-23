import 'jest-preset-angular';
import {Pact} from '@pact-foundation/pact';
import './setupTestBed';

declare var beforeAll: any;
declare var afterAll: any;
declare var provider: Pact;

beforeAll((done) => {
  provider.setup().then(() => {
    done();
  });
});

afterAll((done) => {
  provider.verify()
    .then(() => provider.finalize())
    .then(() => done());
});
