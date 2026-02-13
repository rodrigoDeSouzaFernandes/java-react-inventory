package com.autoflex.inventory.rawmaterial;

import jakarta.enterprise.context.ApplicationScoped;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class RawMaterialRepository implements PanacheRepository<RawMaterial> {
}
