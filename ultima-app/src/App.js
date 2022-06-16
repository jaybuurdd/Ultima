import React from "react";
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <div><p><h3><iframe width="560" height="315" src="https://www.youtube.com/embed/9Hv0BQwYlPw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h3></p></div>


    </BrowserRouter>
   

    

   







   

  );
}



export default App;