import React, { useState, useEffect } from "react";
import { listEmployees } from "../Services/EmployeeServices";
import HeaderComp from "./HeaderComp";
import FooterComp from "./FooterComp";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ReactTableScroll } from "react-table-scroll";
import { deleteEmployee } from "../Services/EmployeeServices";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    listEmployees()
      .then((res) => {
        setEmployees(res.data.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigator = useNavigate();

  const addEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/update-employee/${id}`);
  };

  const deleteEmp = (id) => {
    deleteEmployee(id)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    setEmployees((previousEmployees) =>
      previousEmployees.filter((emp) => emp.id != id)
    );
  };

  return (
    <div className="container vh-500">
      <button className="btn btn-primary m-2" onClick={() => addEmployee()}>
        Add Employee
      </button>
      <div
        style={{
          height: "50vh",
          overflow: "auto",
          border: "2px solid #ddd",
        }}
      >
        <ReactTableScroll>
          <table className="table table-striped table-bordered">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => deleteEmp(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactTableScroll>
      </div>
    </div>
  );
};

export default ListEmployee;
