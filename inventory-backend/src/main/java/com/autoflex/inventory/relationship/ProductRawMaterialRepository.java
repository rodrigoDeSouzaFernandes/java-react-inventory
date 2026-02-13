package com.autoflex.inventory.relationship;

import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class ProductRawMaterialRepository implements PanacheRepository<ProductRawMaterial> {
}
