import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL + "/getAllEmployees");
};

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL + "/save", employee);
};

export const getEmployee = (employeeId) => {
  return axios.get(REST_API_BASE_URL + `/getEmployee?employeeId=${employeeId}`);
};

export const updateEmployee = (employee) => {
  return axios.put(REST_API_BASE_URL + `/update`, employee);
};

export const deleteEmployee = (employeeid) => {
  return axios.delete(REST_API_BASE_URL + `/delete?employeeid=${employeeid}`);
};
