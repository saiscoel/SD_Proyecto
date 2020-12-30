package com.example.Product.repository;

import com.example.Product.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product,Integer> {
    @Query("{'name':?0}")
    List<Product> findbyName(String name);
}

