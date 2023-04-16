import { DiaryEntry } from "../types";
import DiaryEntriesItem from "./DiaryEntriesItem";

interface DiaryEntriesProps {
  diaries: DiaryEntry[]
}

const DiaryEntriesList = (props: DiaryEntriesProps) => {
  return (
    <div>
      <h3>Diary Entries</h3>
      {props.diaries.map(diary => <DiaryEntriesItem key={diary.id} diary={diary} />
      )}
    </div>
  )
}

export default DiaryEntriesList;