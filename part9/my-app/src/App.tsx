import { useEffect, useState } from 'react';
import { Note, NewNote } from './types';
import { getNotes, createNote } from './noteService';

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const notes = await getNotes();
      setNotes(notes);
    })()
  }, [])


  const noteCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const noteToAdd: NewNote = {
      userId: 1,
      title: newNote,
      completed: false
    }
    const response = await createNote(noteToAdd)
    setNotes(notes.concat(response))
    setNewNote('')
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.title}</li>
        )}
      </ul>
    </div>
  )
}

export default App;
