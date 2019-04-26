import {TestBed} from '@angular/core/testing';
import {BookService} from './book.service';
import {HttpClientModule} from '@angular/common/http';
import {Book} from './book.reducer';
import {Matchers} from '@pact-foundation/pact';

describe('BookService', () => {

  describe('search()', () => {

    setupTestBed({
      imports: [
        HttpClientModule
      ],
      providers: [
        BookService
      ]
    });

    const searchTerm = 'Harry Potter';

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider allows to search for books`,
        uponReceiving: `a request with the searchTerm '${searchTerm}' returns a list of books containing the searchTerm in the title`,
        withRequest: {
          method: 'GET',
          path: '/book-service/book',
          query: {
            q: searchTerm
          }
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike([{
            id: '42',
            title: 'Harry Potter and the Half-Blood Prince',
            description: 'Squashy armchairs dirt on your nose brass scales crush the Sopophorous bean with flat side of silver dagger.',
            binding: 'Book',
            authors: ['J. K. Rowling'],
            pages: 1337,
            coverUrl: 'http://bookcover.harrypotter.png',
            productUrl: 'http://amazon.de/harrypotter'
          } as Book]),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(() => {
        done();
      }, error => done.fail(error));
    });

    it('should search books', (done) => {
      const bookService: BookService = TestBed.get(BookService);
      bookService.search(searchTerm).subscribe(response => {
        expect(response).not.toBeNull();
        done();
      }, error => {
        done.fail(error);
      });
    });

  });
});
