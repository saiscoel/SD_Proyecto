package com.example.Discovery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer

public class DiscoveryApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(DiscoveryApplication.class);

	public static void main(String[] args) {
		LOGGER.debug("The Eureka Server is running...");
		SpringApplication.run(DiscoveryApplication.class, args);
	}

}
