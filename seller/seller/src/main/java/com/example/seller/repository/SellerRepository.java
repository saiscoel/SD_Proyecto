package com.example.seller.repository;

import com.example.seller.model.Seller;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SellerRepository extends MongoRepository<Seller, String> {
    Seller findByUser(String user);
}
