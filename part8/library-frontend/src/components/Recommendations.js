import BooksTable from './BooksTable';
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries';

const Recommendations = ({ show, token }) => {
  const userQueryResult = useQuery(ME, { skip: !token });
  const user = userQueryResult?.data?.me;

  const allBooksQueryResult = useQuery(ALL_BOOKS, {
    variables: { genre: user?.favoriteGenre },
    skip: !user,
  });
  const books = allBooksQueryResult?.data?.allBooks;

  if (!show) return null;

  return (
    <div>
      <h2>recommendations</h2>
      {user?.favoriteGenre ? (
        <div>
          <p>
            books in your favorite genre <b>{user?.favoriteGenre}</b>
          </p>
          <BooksTable books={books} />
        </div>
      ) : (
        <p>user does not have a favorite gender</p>
      )}
    </div>
  );
};

export default Recommendations;

