import React from 'react';

const Post = props => {
  return (
    <div className="Props">
      <h2>{props.title}</h2>
      <p>{props.contents}</p>
    </div>
  );
};

Post.defaultProps = {
  title: '',
  contents: ''
};

export default Post;