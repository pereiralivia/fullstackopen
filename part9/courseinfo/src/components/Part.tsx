import './Part.css'
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case 'basic':
      return (
        <section>
          <p className='course-title'>{props.coursePart.name} {props.coursePart.exerciseCount}</p>
          <p className='course-description'>{props.coursePart.description}</p>
        </section>
      )
    case 'group':
      return (
        <section>
          <p className='course-title'>{props.coursePart.name} {props.coursePart.exerciseCount}</p>
          <p>project exercises {props.coursePart.groupProjectCount}</p>
        </section>
      )
    case 'background':
      return (
        <section>
          <p className='course-title'>{props.coursePart.name} {props.coursePart.exerciseCount}</p>
          <p className='course-description'>{props.coursePart.description}</p>
          <p>submit to {props.coursePart.backgroundMaterial}</p>
        </section>
      )
    case 'special':
      return (
        <section>
          <p className='course-title'>{props.coursePart.name} {props.coursePart.exerciseCount}</p>
          <p className='course-description'>{props.coursePart.description}</p>
          <p>required skills: {props.coursePart.requirements.join(', ')}</p>
        </section>
      )
    default:
      return (
        assertNever(props.coursePart)
      )
  }
}

export default Part;