import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/posts";
import { format } from "date-fns";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editComments, setEditComments] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditComments(post.comments);
    }
  }, [post, editTitle, editComments]);
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editComments };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditComments("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <article>
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              rows="10"
              cols="50"
              value={editComments}
              onChange={(e) => setEditComments(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Page Not Found</h2>
          <Link to="/">Back To Home</Link>
        </>
      )}
    </article>
  );
};

export default EditPost;
