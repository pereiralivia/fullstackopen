import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import {
  useNotificationDispatch,
} from '../NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const createNoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createNoteMutation.mutate({
      content,
      votes: 0,
    });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${content}' created`,
    });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

