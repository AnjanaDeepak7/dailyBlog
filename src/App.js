import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import About from "./pages/About";
import Footer from "./pages/Footer";
import Missing from "./pages/Missing";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header />
      <DataProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post" element={<NewPost />} />
            <Route path="edit/:id" element={<EditPost />} />
            <Route path="post/:postId" element={<PostPage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </main>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
