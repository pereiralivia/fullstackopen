import { useState } from 'react';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Feedback = ({
  giveGoodFeedback,
  giveNeutralFeedback,
  giveBadFeedback,
}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={giveGoodFeedback} />
      <Button text="neutral" onClick={giveNeutralFeedback} />
      <Button text="bad" onClick={giveBadFeedback} />
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  const hasFeedback = good || neutral || bad;

  return (
    <div>
      <h1>statistics</h1>
      {hasFeedback ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const giveGoodFeedback = () => setGood(good + 1);
  const giveNeutralFeedback = () => setNeutral(neutral + 1);
  const giveBadFeedback = () => setBad(bad + 1);

  const getAll = () => {
    return good + neutral + bad;
  };

  const getWeightedAverage = () => {
    const weight = {
      good: 1,
      neutral: 0,
      bad: -1,
    };
    const weightedSum =
      good * weight.good + neutral * weight.neutral + bad * weight.bad;
    const all = getAll();
    const weightedAverage = (weightedSum / all).toFixed(1);

    return weightedAverage;
  };

  const getPositive = () => {
    return ((good / all) * 100).toFixed(1) + '%';
  };

  const all = getAll();
  const average = getWeightedAverage();
  const positive = getPositive();

  return (
    <div>
      <Feedback
        giveGoodFeedback={giveGoodFeedback}
        giveNeutralFeedback={giveNeutralFeedback}
        giveBadFeedback={giveBadFeedback}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
