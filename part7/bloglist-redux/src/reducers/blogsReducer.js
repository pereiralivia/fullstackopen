const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export const setBlogs = (blogs) => {
  return { type: 'SET_BLOGS', payload: blogs };
};

export default blogsReducer;

