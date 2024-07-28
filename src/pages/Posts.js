import React from "react";
import { Link } from "react-router-dom";

const Posts = ({ post }) => {
  return (
    <article key={post.id}>
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p>{post.datetime}</p>
      </Link>
      <p>{`${post.body.substring(0, 15)}...`}</p>
    </article>
  );
};

export default Posts;
