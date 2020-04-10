import React from 'react';
import { submitPost } from '../../actions/posts';

function Posts() {
  const onSubmit = e => {
    e.preventDefault();

    const newPost = document.getElementById('post').value;
    submitPost(newPost);
  };
  return (
    <div className="md-10 offset-1 m-4">
      <h2>Write a post</h2>
      <form name="posts" onSubmit={e => onSubmit(e)}>
        <input
          className="mt-4 mb-4"
          type="text"
          id="post"
          placeholder="write something"
        />
        <button type="submit" className="btn btn-primary mb-4">
          Submit a post
        </button>
      </form>
      <h2>Write a post - version 2</h2>
      <form
        action="/api/firebase/image"
        method="POST"
        enctype="multipart/form-data"
      >
        <input className="mt-4 mb-4" type="file" id="post2" />
        <button type="submit" className="btn btn-primary mb-4">
          Submit a post
        </button>
      </form>
    </div>
  );
}

export default Posts;
