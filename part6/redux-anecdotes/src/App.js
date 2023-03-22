import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createAnecdote,
  updateAnecdote,
  initializeAnecdotes,
} from './reducers/anecdoteReducer';
import { setNotificationMessage } from './reducers/notificationReducer';
import AnecdoteFilter from './components/AnecdoteFilter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
    }
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes);
  });

  const handleClick = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(setNotificationMessage(`you voted '${anecdote.content}'`, 5000));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    dispatch(createAnecdote(newAnecdote));
    e.target.anecdote.value = '';
    dispatch(setNotificationMessage(`you created '${newAnecdote}'`, 5000));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList anecdotes={anecdotes} onClick={handleClick} />
      <AnecdoteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;

