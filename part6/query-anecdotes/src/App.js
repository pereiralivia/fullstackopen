import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotificationDispatch } from './NotificationContext';

const App = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const anecdotesQuery = useQuery('anecdotes', getAnecdotes);
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const anecdotes = anecdotesQuery.data
    ? anecdotesQuery.data
    : [
        {
          content: 'If it hurts, do it more often',
          id: '47145',
          votes: 0,
        },
      ];

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted`,
    });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);
  };

  if (anecdotesQuery.isError) {
    return <div>anecdote service not available due to problem in server</div>;
  }

  if (anecdotesQuery.isLoading) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;

