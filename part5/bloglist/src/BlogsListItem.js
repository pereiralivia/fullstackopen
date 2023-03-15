import PropTypes from 'prop-types';
import { useState } from 'react';

const style = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};

const BlogsListItem = ({ user, blog, onLikeButtonClick, onDeleteButtonClick }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div style={style} className="blog">
      <span>{blog.title} </span>
      <span>{blog.author}</span>
      <button onClick={() => setShowMoreInfo(!showMoreInfo)}>
        {showMoreInfo ? 'hide' : 'show'}
      </button>
      {showMoreInfo && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{' '}
            <button id="like-button" onClick={() => onLikeButtonClick(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
      {blog.user.username === user.username && (
        <button id="remove-blog-button" onClick={() => onDeleteButtonClick(blog)}>
          remove
        </button>
      )}
    </div>
  );
};

BlogsListItem.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object,
  onLikeButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired
};

export default BlogsListItem;

