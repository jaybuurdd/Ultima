import BlogList from "./BlogList";
import useFetch from "./useFetch";
import React from "react";

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:3000/myWallet')
    return (
      
    <div className="home">
      
      <div><p><h3><iframe width="560" height="315" class= "center" src="https://www.youtube.com/embed/9Hv0BQwYlPw" title="YouTube video player" frameborder="auto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></h3></p></div>

      
    </div>
    
  );
}
 
export default Home;