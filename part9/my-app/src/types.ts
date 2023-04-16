export interface Note {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export type NewNote = Omit<Note, 'id'>
