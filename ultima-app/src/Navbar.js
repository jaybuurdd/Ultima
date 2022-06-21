import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Ultima Trading Bot</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/myWallet" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>My wallet</Link>
        <Link to="/transactions" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Transaction</Link>
        </div>
    </nav>
    


  );
}
 
export default Navbar;