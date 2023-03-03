const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const { parts } = course;

  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  );
};

const Total = ({ course }) => {
  const { parts } = course;

  const numberOfExercises =
    parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {numberOfExercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
