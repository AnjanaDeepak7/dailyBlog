import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/posts";
import { format } from "date-fns";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [comments, setComments] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title, datetime, body: comments };
    try {
      const response = await api.post("/posts", newPost);
      const updatedPosts = [...posts, response.data];
      setPosts(updatedPosts);
      setTitle("");
      setComments("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <article>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="comments">Comments:</label>
        <textarea
          id="comments"
          rows="10"
          cols="50"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </article>
  );
};

export default NewPost;
