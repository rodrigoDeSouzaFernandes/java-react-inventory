package com.autoflex.inventory.product;

import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {
}
