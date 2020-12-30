package com.example.Process.repository;

import com.example.Process.model.Proceso;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProcessRepository extends MongoRepository<Proceso,Integer> {
}
