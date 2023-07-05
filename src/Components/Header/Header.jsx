import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="drop-shadow">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h5 className="text-primary brand">Grocery App</h5>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
