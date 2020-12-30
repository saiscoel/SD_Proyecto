package com.example.Process.repository;

import com.example.Process.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer,String> {
    Customer findByUser(String user);
}

