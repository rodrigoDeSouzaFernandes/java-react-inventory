package com.autoflex.inventory.product;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

import com.autoflex.inventory.relationship.ProductRawMaterial;

@ApplicationScoped
public class ProductService {

    @Inject
    ProductRepository productRepository;

    public List<ProductWithQuantityDTO> listProductsWithQuantity(boolean productibleOnly) {
        return productRepository.listAll().stream()
                .map(product -> {
                    int producibleQty = calculateProducibleQuantity(product);
                    ProductWithQuantityDTO dto = new ProductWithQuantityDTO();
                    dto.id = product.getId();
                    dto.name = product.getName();
                    dto.value = product.getValue();
                    dto.producibleQuantity = producibleQty;
                    return dto;
                })
                .filter(dto -> !productibleOnly || dto.producibleQuantity > 0)
                .collect(Collectors.toList());
    }

  
    public int calculateProducibleQuantity(Product product) {
        List<ProductRawMaterial> rawMaterials = product.getRawMaterials();
        if (rawMaterials == null || rawMaterials.isEmpty()) {
            return 0;
        }

        return rawMaterials.stream()
                .mapToInt(prm -> prm.getRawMaterial().getStockQuantity() / prm.getRequiredQuantity())
                .min()
                .orElse(0);
    }
}
