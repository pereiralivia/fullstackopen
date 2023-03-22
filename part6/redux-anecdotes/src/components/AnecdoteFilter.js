import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };
  return (
    <div>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;

