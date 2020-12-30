package com.example.Register.repository;

import com.example.Register.model.Register;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegisterRepository extends MongoRepository<Register,Integer> {
}
