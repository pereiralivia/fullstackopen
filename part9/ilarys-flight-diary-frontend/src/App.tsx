import { useEffect, useState } from "react";
import { getDiaries, createDiary } from "./diaryService";
import { DiaryEntry, NewDiaryEntry } from "./types";
import DiaryEntriesList from "./components/DiaryEntriesList";
import DiaryEntryForm from "./components/DiaryEntryForm";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const diaries = await getDiaries();
      setDiaries(diaries)
    })()
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent, newDiaryEntry: NewDiaryEntry) => {
    e.preventDefault();
    try {
      const createdDiary = await createDiary(newDiaryEntry);
      setDiaries([...diaries, createdDiary])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data)
        setTimeout(() => {
          setError('')
        }, 5000)
      } else {
        setError('Something went wrong');
        setTimeout(() => {
          setError('')
        }, 5000)
      }
    }
  }

  return (
    <div>
      <DiaryEntryForm onSubmit={handleSubmit} error={error} />
      <DiaryEntriesList diaries={diaries} />
    </div>
  )
}

export default App;
