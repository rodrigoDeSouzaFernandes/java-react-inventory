package com.autoflex.inventory.relationship;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class ProductRawMaterialRepository implements PanacheRepository<ProductRawMaterial> {

    public ProductRawMaterial findByIds(Long productId, Long rawMaterialId) {
        return find("product.id = ?1 and rawMaterial.id = ?2", productId, rawMaterialId)
                .firstResult();
    }

    @Transactional
    public boolean deleteByIds(Long productId, Long rawMaterialId) {
        return delete("product.id = ?1 and rawMaterial.id = ?2", productId, rawMaterialId) > 0;
    }
}
