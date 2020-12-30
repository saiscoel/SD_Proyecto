package com.example.Register.resource;

import com.example.Register.model.Register;
import com.example.Register.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RegisterController {
    @Autowired
    private RegisterRepository repository;

    @PostMapping("/addRegister")
    public String saveProcess(@RequestBody Register register) {
        repository.save(register);
        return "Added register with id : " ;
    }

    @GetMapping("/findAllRegister")
    public List<Register> getRegister() {
        return repository.findAll();
    }

    @GetMapping("/findAllRegister/{id}")
    public Optional<Register> getRegister(@PathVariable int id) {
        return repository.findById(id);
    }

}
