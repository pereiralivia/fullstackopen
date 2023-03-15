import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import BlogsListItem from './BlogsListItem';
import CreateBlogForm from './CreateBlogForm';

test('component renders only blog title and author', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'blogurl.com',
    likes: 1,
    user: {
      username: 'livia',
    },
  };

  const user = {
    username: 'livia',
    password: 'pereira',
  };

  const onLikeButtonClick = jest.fn();
  const onDeleteButtonClick = jest.fn();

  render(
    <BlogsListItem
      user={user}
      blog={blog}
      onLikeButtonClick={onLikeButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const title = screen.getByText(blog.title);
  const author = screen.getByText(blog.author);
  const url = screen.queryByText(blog.url);
  const likes = screen.queryByText(blog.likes);

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBe(null);
  expect(likes).toBe(null);
});

test('component renders url and likes when view more button is clicked', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'blogurl.com',
    likes: 1,
    user: {
      username: 'root',
    },
  };

  const user = {
    username: 'root',
  };

  const onLikeButtonClick = jest.fn();
  const onDeleteButtonClick = jest.fn();

  render(
    <BlogsListItem
      user={user}
      blog={blog}
      onLikeButtonClick={onLikeButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const showButton = screen.getByText('show');

  const testUser = userEvent.setup();
  await testUser.click(showButton);

  const url = screen.queryByText(blog.url);
  const likes = screen.queryByText(`likes ${blog.likes}`);

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('when like button is called twice, incrementLikes handler is called twice', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'blogurl.com',
    likes: 0,
    user: {
      username: 'livia',
    },
  };

  const user = {
    username: 'livia',
    name: 'livia',
  };

  const onLikeButtonClick = jest.fn();
  const onDeleteButtonClick = jest.fn();

  const testUser = userEvent.setup();

  const { container } = render(
    <BlogsListItem
      user={user}
      blog={blog}
      onLikeButtonClick={onLikeButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const showButton = screen.getByText('show');
  await testUser.click(showButton);

  const likeButton = container.querySelector('#like-button');
  await testUser.click(likeButton);
  await testUser.click(likeButton);
  expect(onLikeButtonClick.mock.calls).toHaveLength(2);
});

test('create blog handler is submited with blog title, author and url provided in the form', async () => {
  const createBlog = jest.fn((e) => e.preventDefault());

  const user = userEvent.setup();

  const { container } = render(
    <CreateBlogForm createBlog={createBlog} />
  );

  const newBlogButton = container.querySelector('#new-blog-button');
  await user.click(newBlogButton);

  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');
  await user.type(title, 'Blog title');
  await user.type(author, 'Blog author');
  await user.type(url, 'blog.com');

  const createBlogButton = container.querySelector('#create-blog-button');
  await user.click(createBlogButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][1].title).toBe('Blog title');
  expect(createBlog.mock.calls[0][1].author).toBe('Blog author');
  expect(createBlog.mock.calls[0][1].url).toBe('blog.com');
});
