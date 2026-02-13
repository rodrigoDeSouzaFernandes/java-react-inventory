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

    /**
     * Retorna todos os produtos com a quantidade que pode ser produzida
     * Se productibleOnly for true, retorna apenas produtos que podem ser produzidos (quantidade > 0)
     */
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

    /**
     * Calcula a quantidade máxima que pode ser produzida com base nas matérias-primas
     */
    public int calculateProducibleQuantity(Product product) {
        List<ProductRawMaterial> rawMaterials = product.getRawMaterials();
        if (rawMaterials == null || rawMaterials.isEmpty()) {
            return 0;
        }

        // quantidade máxima que pode ser produzida = mínimo de (estoque / quantidade necessária)
        return rawMaterials.stream()
                .mapToInt(prm -> prm.getRawMaterial().getStockQuantity() / prm.getRequiredQuantity())
                .min()
                .orElse(0);
    }
}
