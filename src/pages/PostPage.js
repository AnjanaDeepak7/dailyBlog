import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/posts";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = posts.find((post) => post.id.toString() === postId);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="post-page">
      <article>
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            {/* <Link to={`/edit/${post.id}`}>
              <button>Edit Post</button>
            </Link> */}
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        ) : (
          <>
            <h2>Page Not found</h2>
          </>
        )}
        <Link to="/">Back to Home</Link>
      </article>
    </div>
  );
};

export default PostPage;
