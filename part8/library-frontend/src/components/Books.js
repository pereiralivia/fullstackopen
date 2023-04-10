import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import BooksTable from './BooksTable';

const Books = (props) => {
  const [genre, setGenre] = useState('');

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show) {
    return null;
  }

  const books = result?.data?.allBooks;
  const genres = books?.reduce((genresArray, book) => {
    return [...new Set([...genresArray, ...book?.genres])];
  }, []);

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <BooksTable books={books} />
      <div>
        {genres?.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;

