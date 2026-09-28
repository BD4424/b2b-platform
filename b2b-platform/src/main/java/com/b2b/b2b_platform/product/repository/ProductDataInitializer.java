package com.b2b.b2b_platform.product.repository;

import com.b2b.b2b_platform.product.entity.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductDataInitializer {
    @Bean
    CommandLineRunner seedProductLookups(CategoryRepository categories, BrandRepository brands) {
        return args -> {
            if (categories.count() == 0) {
                categories.save(new Category("Wires & Cables", "Electrical wires and power cables"));
                categories.save(new Category("Switches & Sockets", "Switches, sockets and accessories"));
                categories.save(new Category("MCBs & Protection", "MCBs, RCCBs and distribution protection"));
                categories.save(new Category("Lighting", "LED bulbs, lights and fixtures"));
                categories.save(new Category("Pipes & Plumbing", "PVC pipes and plumbing materials"));
                categories.save(new Category("Hardware", "Fasteners, tools and general hardware"));
            }
            if (brands.count() == 0) {
                brands.save(new Brand("Havells"));
                brands.save(new Brand("Polycab"));
                brands.save(new Brand("Finolex"));
                brands.save(new Brand("Schneider Electric"));
                brands.save(new Brand("Anchor"));
            }
        };
    }
}
