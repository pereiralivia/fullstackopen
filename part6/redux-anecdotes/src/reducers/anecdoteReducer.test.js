
import deepFreeze from 'deep-freeze';
import anecdoteReducer from './anecdoteReducer';

describe('anecdoteReducer', () => {
  test('should increment anecdote vote when action type VOTE is dispatched', () => {
    const state = [
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0,
      },
    ];
    const action = {
      type: 'anecdotes/vote',
      payload: 1,
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState[0]).toEqual({
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 1,
    });
  });

  test('should add anecdote when NEW_ANECDOTE action type is dispatched', () => {
    const state = [];
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 0,
      },
    };
    const newState = anecdoteReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });
});

