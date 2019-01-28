import { BookModule } from './book.module';

describe('BookModule', () => {
  let bookModule: BookModule;

  beforeEach(() => {
    bookModule = new BookModule();
  });

  it('should create an instance', () => {
    expect(bookModule).toBeTruthy();
  });
});
