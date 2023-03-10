const Header = ({ course }) => {
  const { name } = course;
  return <h2>{name}</h2>;
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
  return parts.map((part) => <Part key={part.id} part={part} />);
};

const Total = ({ course }) => {
  const { parts } = course;

  const totalExercises = parts.reduce((total, currentPart) => {
    return (total += currentPart.exercises);
  }, 0);

  return (
    <p>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;

