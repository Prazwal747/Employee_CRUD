import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../Services/EmployeeServices";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const { id } = useParams();
  const [Employee, setEmployee] = useState({});

  // const isButtonDisabled = !(firstName && lastName && email);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const validateForm = () => {
    let valid = true;

    const errorCopy = { ...errors }; //what we did here is copied the previous initialized state so that we can again set errorCopy objects and based on that set true or false of form Validity

    if (firstName.trim()) {
      errorCopy.firstName = ""; //no errors if firstName was filled and it got trimmed , if not got trimmer there would be error saved in here as string
    } else {
      errorCopy.firstName = "First name is Required";
      valid = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last name is Required";
      valid = false;
    }

    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email is Required";
      valid = false;
    }

    setErrors(errorCopy); //after checking all we set a new ErrorObject field to main errors state

    return valid;
  };

  const saveEmployee = (event) => {
    event.preventDefault();

    if (id) {
      if (validateForm()) {
        event.preventDefault();
        const employee = { id, firstName, lastName, email };
        updateEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/getAllEmployees");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return;
    }

    if (validateForm()) {
      event.preventDefault();
      const employee = { firstName, lastName, email };
      createEmployee(employee)
        .then((response) => {
          console.log(response.data);
          navigator("/getAllEmployees");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (event) => {
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value } = event.target; //// Destructure event.target
    if (name == "firstName") {
      setFirstName(value);
    } else if (name == "lastName") {
      setLastName(value);
    } else if (name == "email") {
      setEmail(value);
    }
  };

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        console.log("Update page function");
        console.log(response.data.data);
        const { firstName, lastName, email } = response.data.data; //destructured
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      });
    }
  }, []);

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mt-2">Update Employee</h2>;
    } else {
      return <h2 className="text-center mt-2">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <h1>
        <br></br>
      </h1>
      <div className="row">
        <div className="card col-md-6 offset-md- offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
                <label className="form-label mt-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
                <label className="form-label mt-2">Password</label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  value={email}
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  } `}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <button
                  // disabled={isButtonDisabled}
                  className="btn btn-success mt-2"
                  onClick={(e) => saveEmployee(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComp;
