import { DiaryEntry } from "../types"

interface DiaryEntriesItemProps {
  diary: DiaryEntry
}

const DiaryEntriesItem = (props: DiaryEntriesItemProps) => {
  return (
    <div>
      <h4>{props.diary.date}</h4>
      <p>visibility: {props.diary.visibility}</p>
      <p>weather: {props.diary.weather}</p>
    </div>
  )
}

export default DiaryEntriesItem;