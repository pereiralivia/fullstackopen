import PropTypes from 'prop-types';
import BlogsListItem from './BlogsListItem';

const BlogsList = ({ user, blogs, incrementLike, deleteBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogsListItem
            key={blog.id}
            user={user}
            blog={blog}
            onLikeButtonClick={incrementLike}
            onDeleteButtonClick={deleteBlog}
          />
        ))}
    </div>
  );
};

BlogsListItem.propTypes = {
  blogs: PropTypes.object,
  user: PropTypes.object,
  onLikeButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired

};

export default BlogsList;

