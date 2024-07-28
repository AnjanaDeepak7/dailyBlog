import React, { useContext } from "react";
import Posts from "./Posts";
import DataContext from "../context/DataContext";

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
  return (
    <div className="posts">
      {isLoading && <p>Loading Posts...</p>}
      {!isLoading && fetchError && <p>{fetchError}</p>}
      {!isLoading &&
        !fetchError &&
        (searchResults ? (
          searchResults.map((post) => <Posts post={post} key={post.id} />)
        ) : (
          <p style={{ margin: "2rem" }}>No Posts to Display</p>
        ))}
    </div>
  );
};

export default Home;
