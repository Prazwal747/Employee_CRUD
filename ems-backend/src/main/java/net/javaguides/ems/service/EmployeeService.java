package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.model.Employee;

import java.util.List;

public interface EmployeeService {

    public EmployeeDto createEmployee(EmployeeDto employeeDto);
    public  EmployeeDto getEmployeeId(Long employeeId);
    public List<EmployeeDto> getAllEmployees();
    public EmployeeDto updateEmployee(EmployeeDto employeeDto);
    public void deleteEmployee(Long employeeId);

}
