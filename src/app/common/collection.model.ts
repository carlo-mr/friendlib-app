export class Collection {
  ownerId: string;
  exemplars: string[];

  borrowedExemplars: string[] = [];
  borrowingRequests: string[] = [];
}
