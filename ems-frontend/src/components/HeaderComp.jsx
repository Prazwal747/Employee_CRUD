import React from "react";
import { useNavigate } from "react-router-dom";

function HeaderComp() {
  let navigator = useNavigate();
  return (
    <div>
      <div className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <p onClick={() => navigator("/getAllEmployees")}>
              Employee Dashboard
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderComp;
