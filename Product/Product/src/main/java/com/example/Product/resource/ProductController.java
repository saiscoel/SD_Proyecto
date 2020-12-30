package com.example.Product.resource;

import com.example.Product.model.Product;
import com.example.Product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin()
public class ProductController {
        @Autowired
        private ProductRepository repository;

        @PostMapping("/addProduct")
        public String saveProduct(@RequestBody Product product) {
            repository.save(product);
            return "Added product with id : " + product.getId();
        }

        @PutMapping("/updateProduct")
        public String updateProduct(@RequestBody Product product) {
            repository.save(product);
            return "Added product with id : " + product.getId();
        }

        @GetMapping("/findAllProducts")
        public List<Product> getProduct() {
            return repository.findAll();
        }

        @GetMapping("/findAllProduct/{id}")
        public Optional<Product> getProduct(@PathVariable int id) { return repository.findById(id); }

        @GetMapping("/find/{name}")
        public List<Product> getProducts(@PathVariable String name) { return repository.findbyName(name); }

}
