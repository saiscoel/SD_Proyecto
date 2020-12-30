package com.example.Process.repository;

import com.example.Process.model.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SellerRepository extends MongoRepository<Seller, String> {
    Seller findByUser(String user);
}
