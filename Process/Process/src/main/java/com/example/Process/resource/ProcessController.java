package com.example.Process.resource;

import com.example.Process.model.Customer;
import com.example.Process.model.Proceso;
import com.example.Process.model.Product;
import com.example.Process.model.Seller;
import com.example.Process.repository.CustomerRepository;
import com.example.Process.repository.ProcessRepository;
import com.example.Process.repository.ProductRepository;
import com.example.Process.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class ProcessController {
    @Autowired
    private ProcessRepository repository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @PostMapping("/addProcess/customer/{customer}/product/{id}/seller/{seller}")
    public String saveProcess(@PathVariable int id,@PathVariable String customer, @PathVariable String seller){
        Product productUser   = productRepository.findById(id).get();
        Customer customerUser = customerRepository.findByUser(customer);
        Seller sellerUser     = sellerRepository.findByUser(seller);
        Date date = new Date();
        date.getTime();
        Proceso process=new Proceso(
                date.toString(),
                customerUser.getDireccion(),
                customerUser.getPhone(),
                sellerUser.getPhone(),
                productUser.getName(),
                productUser.getPrice(),
                customer,
                seller);
        repository.save(process);
        return "Added process";
    }

    @GetMapping("/customer/{customer}/product/{id}/seller/{seller}")
    public Optional<Proceso> getProcess(@PathVariable int id) {return repository.findById(id); }


}
