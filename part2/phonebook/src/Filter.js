const Filter = ({ searchKeyword, onChange }) => {
  return (
    <div>
      filter shown with:
      <input value={searchKeyword} onChange={onChange} />
    </div>
  );
};

export default Filter;
