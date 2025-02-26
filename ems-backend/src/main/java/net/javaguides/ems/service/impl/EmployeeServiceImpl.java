package net.javaguides.ems.service.impl;

import net.javaguides.ems.Exception.ResourceNotFoundException;
import net.javaguides.ems.Mapper.EmployeeMapper;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.model.Employee;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    public void setEmployeeRepository(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public EmployeeRepository getEmployeeRepository() {
        return employeeRepository;
    }

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeId(Long employeeId) {
       Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->
                new ResourceNotFoundException("Employee not found with the provided id:"+ employeeId));
       return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee -> EmployeeMapper.mapToEmployeeDto(employee))).
                collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeDto.getId()).orElseThrow(
                ()->new RuntimeException("empoyeeid proided doesnt exist")
        );
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setId(employeeDto.getId());
        employeeRepository.save(employee);
        return employeeDto;
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId).orElseThrow(()->
                new ResourceNotFoundException("Employee id provided does'nt exist"));
        employeeRepository.deleteById(employeeId);
    }



}
