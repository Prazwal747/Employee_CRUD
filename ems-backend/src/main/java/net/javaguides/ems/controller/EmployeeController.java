package net.javaguides.ems.controller;


import net.javaguides.ems.HTTPmodel.ResponseModel;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    private EmployeeService employeeService; //DI with constructor injection

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    
    @PostMapping("/save")
    public ResponseEntity<ResponseModel<EmployeeDto>> createEmployee(@RequestBody EmployeeDto employeeDto){
        if(employeeDto==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseModel<EmployeeDto>(400,"Recieved Empty Object",null));
        }
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return ResponseEntity.ok(new ResponseModel<EmployeeDto>(200,"Success",savedEmployee));
    }

    @GetMapping("/getEmployee")
    public ResponseEntity<ResponseModel<EmployeeDto>> getEmployeeById(@RequestParam Long employeeId){
        if (employeeId==null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).
                    body(new ResponseModel<EmployeeDto>(504,"Bad request",null));
        }
           EmployeeDto employeeDto = employeeService.getEmployeeId(employeeId);
            return ResponseEntity.ok(new ResponseModel<EmployeeDto>(200,"Success",employeeDto));
    }

    @GetMapping("/getAllEmployees")
    public ResponseEntity<ResponseModel<List<EmployeeDto>>> getAllEmployees(){
        List<EmployeeDto> employeeDtos = employeeService.getAllEmployees();
        if (employeeDtos.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).
                    body(new ResponseModel<List<EmployeeDto>>(400,"EMPTY",null));
        }
        return ResponseEntity.ok(new ResponseModel<List<EmployeeDto>>(200,"SUCCESS",employeeDtos));
    }


    @PutMapping("/update")
    public ResponseEntity<ResponseModel<EmployeeDto>> updateEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto employee = employeeService.updateEmployee(employeeDto);
        return ResponseEntity.ok(new ResponseModel<EmployeeDto>(200,"SUCCESS",employee));
    }

    @DeleteMapping("/delete")
        public ResponseEntity<Void> deleteEmployee(@RequestParam Long employeeid){
        employeeService.deleteEmployee(employeeid);
        return ResponseEntity.ok().build();
    }
}


