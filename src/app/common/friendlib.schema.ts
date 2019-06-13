import {schema} from 'normalizr';

export const BookEntity = new schema.Entity(
  'books',
  {},
  {idAttribute: 'bookId'}
);

export const BorrowingEntity = new schema.Entity(
  'borrowings',
  {},
  {idAttribute: 'borrowingId'}
);

export const ExemplarEntity = new schema.Entity('exemplars', {
  book: BookEntity,
  borrowings: [BorrowingEntity]
}, {idAttribute: 'exemplarId'});

export const borrowedExemplarsSchema = new schema.Entity('borrowedExemplars');

export const CollectionSchema = {
  borrowedExemplars: [ExemplarEntity],
  exemplars: [ExemplarEntity],
  borrowingRequests: [BorrowingEntity]
};
