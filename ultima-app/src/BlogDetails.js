import React from "react"
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:3000/transactions/' + id);
 const history = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:3000/transactions/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      <h1> Test</h1>
    </div>
  );
}
 
export default BlogDetails;