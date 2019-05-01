import {authReducer, initialState} from './auth.reducer';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = authReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
