package com.example.eshop_api.config;

import com.example.eshop_api.model.Product;
import com.example.eshop_api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(ProductRepository productRepository) {
        return _ -> productRepository.saveAll(List.of(
                new Product(null, "Boty", "Pohodlné sportovní boty", 1200),
                new Product(null, "Tričko", "Bílé bavlněné tričko", 350),
                new Product(null, "Kalhoty", "Modré džíny", 800),
                new Product(null, "Čepice", "Stylová černá čepice", 200),
                new Product(null, "Batoh", "Praktický batoh na cesty", 1500),
                new Product(null, "Hodinky", "Elegantní náramkové hodinky", 2500),
                new Product(null, "Sluchátka", "Bezdrátová sluchátka s dlouhou výdrží", 1800),
                new Product(null, "Brýle", "Sluneční brýle s UV ochranou", 600),
                new Product(null, "Boty do deště", "Voděodolné gumové boty", 900),
                new Product(null, "Mikina", "Teplá bavlněná mikina", 700)
        ));
    }
}


