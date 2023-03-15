import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

test('create blog handler is submited with blog title, author and url provided in the form', async () => {
  const createBlog = jest.fn((e) => e.preventDefault());

  const user = userEvent.setup();

  const { container } = render(<CreateBlogForm createBlog={createBlog} />);

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
