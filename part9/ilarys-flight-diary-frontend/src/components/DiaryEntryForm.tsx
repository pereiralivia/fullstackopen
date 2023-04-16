import React, { useState } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";

interface DiaryEntryFormProps {
  onSubmit: (e: React.SyntheticEvent, object: NewDiaryEntry) => void;
  error: string
}

const DiaryEntryForm = (props: DiaryEntryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  return (
    <div>
      <h3>Add new entry</h3>
      {props.error && <p style={{ color: 'red' }}>{props.error}</p>}
      <form onSubmit={(e,) => props.onSubmit(e, { date, visibility, weather, comment })}>
        <div>
          date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility: {Object.values(Visibility).map(v => (
            <span key={v}><input type="radio" value={visibility} onChange={(e) => setVisibility(e.target.value as Visibility)} /> {v}</span>
          ))}
        </div>
        <div>
          weather: {Object.values(Weather).map(w => (
            <span key={w}><input type="radio" value={weather} onChange={(e) => setWeather(e.target.value as Weather)} />{w}</span>
          ))}
        </div>
        <div>
          comment <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryEntryForm;