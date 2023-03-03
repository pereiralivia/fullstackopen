import { useState } from 'react';

const getRandomNumber = (maxNumber) => {
  const randomNumber = Math.floor(Math.random() * maxNumber);
  return randomNumber;
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const AnecdoteOfTheDay = ({
  selectedAnecdote,
  selectedAnecdoteVotes,
  handleSelectAnecdote,
  handleIncrementVote,
}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selectedAnecdote}</p>
      <p>has {selectedAnecdoteVotes} votes</p>
      <Button text="vote" onClick={handleIncrementVote} />
      <Button text="next anecdote" onClick={handleSelectAnecdote} />
    </div>
  );
};

const MostVotedAnecdote = ({ anecdoteWithMaxVotes, maxVotes }) => {
  const hasVotes = maxVotes !== 0;
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {hasVotes ? (
        <div>
          <p>{anecdoteWithMaxVotes}</p>
          <p>has {maxVotes} votes</p>
        </div>
      ) : (
        <p>No anecdotes have been voted yet.</p>
      )}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectedAnecdote = anecdotes[selected];
  const selectedAnecdoteVotes = votes[selected];

  const maxVotes = Math.max(...votes);
  const anecdoteWithMaxVotes = anecdotes[votes.indexOf(maxVotes)];

  const handleSelectAnecdote = () => {
    setSelected(getRandomNumber(anecdotes.length));
  };

  const handleIncrementVote = () => {
    votes[selected]++;
    setVotes([...votes]);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        selectedAnecdote={selectedAnecdote}
        selectedAnecdoteVotes={selectedAnecdoteVotes}
        handleSelectAnecdote={handleSelectAnecdote}
        handleIncrementVote={handleIncrementVote}
      />
      <MostVotedAnecdote
        anecdoteWithMaxVotes={anecdoteWithMaxVotes}
        maxVotes={maxVotes}
      />
    </div>
  );
};

export default App;

