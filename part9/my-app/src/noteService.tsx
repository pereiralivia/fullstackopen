import axios from 'axios';
import { Note, NewNote } from './types';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

export const getNotes = async () => {
  const response = await axios.get<Note[]>(baseUrl)
  return response.data.slice(0, 10);
}

export const createNote = async (object: NewNote) => {
  const response = await axios.post<Note>(baseUrl, object);
  return response.data;
}
