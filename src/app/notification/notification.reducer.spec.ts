import {initialState, notificationReducer} from './notification.reducer';

describe('Notification Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = notificationReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
