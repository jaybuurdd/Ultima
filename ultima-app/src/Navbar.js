import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Ultima Trading Bot</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>My wallet</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Transection</Link>
        </div>
    </nav>
    


  );
}
 
export default Navbar;