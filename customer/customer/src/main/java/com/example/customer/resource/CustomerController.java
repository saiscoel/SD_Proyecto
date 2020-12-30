package com.example.customer.resource;

import com.example.customer.model.Customer;
import com.example.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerRepository repository;

    @PostMapping("/addCustomer")
    public String saveCustomer(@RequestBody Customer customer) {
        repository.save(customer);
        return "Added customer with id : " + customer.getUser(); }

    @PutMapping("/updateCustomer")
    public String updateCustomer(@RequestBody Customer customer) {
        repository.save(customer);
        return "Added customer with id : " + customer.getUser(); }    

    @GetMapping("/findAllCustomer")
    public List<Customer> getCustomer() {
        return repository.findAll();
    }

    @GetMapping("/findCustomer/{user}")
    public Customer getCustomer(@PathVariable String user) { return repository.findByUser(user); }

}
