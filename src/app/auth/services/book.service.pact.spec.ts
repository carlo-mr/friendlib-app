import {TestBed} from '@angular/core/testing';
import {Matchers, PactWeb} from '@pact-foundation/pact-web';
import {BookService} from './book.service';
import {HttpClientModule} from '@angular/common/http';
import {Book} from '../models/book.model';

describe('BookService', () => {
  let provider: PactWeb;

  beforeAll(function (done) {
    provider = new PactWeb({
      consumer: 'ui',
      provider: 'bookservice',
      port: 1235,
      host: 'localhost',
    });

    // required for slower CI environments
    setTimeout(done, 2000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        BookService
      ],
    });
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('create()', () => {

    const expectedBook: Book = {
      title: 'Cool book'
    };

    const createdBookId = 42;

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider accepts a new book`,
        uponReceiving: 'a request to POST a book',
        withRequest: {
          method: 'POST',
          path: '/book-service/book',
          body: expectedBook,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 201,
          body: Matchers.somethingLike({
            id: createdBookId
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));
    });

    it('should create a Book', (done) => {
      const bookService: BookService = TestBed.get(BookService);
      bookService.create(expectedBook).subscribe(response => {
        expect(response).toEqual(createdBookId);
        done();
      }, error => {
        done.fail(error);
      });
    });

  });

  afterAll(function (done) {
    console.log('afterAll');
    provider.finalize()
      .then(function () {
        done();
      }, function (err) {
        done.fail(err);
      });
  });
});
