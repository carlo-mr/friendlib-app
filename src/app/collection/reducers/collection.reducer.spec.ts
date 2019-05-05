import {collectionReducer, initialState} from './collection.reducer';

describe('Collection Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = collectionReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
