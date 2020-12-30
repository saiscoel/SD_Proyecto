package com.example.seller.resource;

import com.example.seller.model.Seller;
import com.example.seller.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SellerController {
    @Autowired
    private SellerRepository repository;

    @PostMapping("/addSeller")
    public String saveSeller(@RequestBody Seller seller) {
        repository.save(seller);
        return "Added seller with id : " + seller.getUser();
    }

    @PutMapping("/updateSeller")
    public String updateSeller(@RequestBody Seller seller) {
        repository.save(seller);
        return "Added seller with id : " + seller.getUser();
    }

    @GetMapping("/findAllSeller")
    public List<Seller> getSeller() {
        return repository.findAll();
    }

    @GetMapping("/findAllSeller/{user}")
    public Seller getSeller(@PathVariable String user) {return repository.findByUser(user);
    }


}