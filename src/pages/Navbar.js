import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/DataContext";

const Navbar = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <nav>
      <input
        type="searchbox"
        placeholder="search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/">Home</Link>
      <Link to="/post">Post</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navbar;
