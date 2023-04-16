interface CourseParts {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: CourseParts[]
}

const Total = (props: ContentProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total;