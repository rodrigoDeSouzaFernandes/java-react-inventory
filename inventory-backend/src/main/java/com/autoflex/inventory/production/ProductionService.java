package com.autoflex.inventory.production;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.autoflex.inventory.product.Product;
import com.autoflex.inventory.product.ProductRepository;
import com.autoflex.inventory.production.DTO.ProductionSuggestionDTO;
import com.autoflex.inventory.production.DTO.ProductionSuggestionItemDTO;
import com.autoflex.inventory.rawmaterial.RawMaterial;
import com.autoflex.inventory.rawmaterial.RawMaterialRepository;
import com.autoflex.inventory.relationship.ProductRawMaterial;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class ProductionService {

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    public ProductionSuggestionDTO calculateProductionSuggestion() {

        List<Product> products = productRepository.find("order by value desc").list();

        Map<Long, Integer> virtualStock = rawMaterialRepository
                .listAll()
                .stream()
                .collect(Collectors.toMap(
                        RawMaterial::getId,
                        RawMaterial::getStockQuantity));

        List<ProductionSuggestionItemDTO> result = new ArrayList<>();
        BigDecimal grandTotal = BigDecimal.ZERO;

        for (Product product : products) {

            int maxProducible = Integer.MAX_VALUE;

            for (ProductRawMaterial prm : product.getRawMaterials()) {

                Long rawMaterialId = prm.getRawMaterial().getId();
                int available = virtualStock.getOrDefault(rawMaterialId, 0);
                int required = prm.getRequiredQuantity();

                if (required == 0) {
                    maxProducible = 0;
                    break;
                }

                int possibleFromThisMaterial = available / required;

                maxProducible = Math.min(maxProducible, possibleFromThisMaterial);
            }

            if (maxProducible > 0 && maxProducible != Integer.MAX_VALUE) {

                for (ProductRawMaterial prm : product.getRawMaterials()) {

                    Long rawMaterialId = prm.getRawMaterial().getId();
                    int required = prm.getRequiredQuantity();

                    int currentStock = virtualStock.get(rawMaterialId);
                    virtualStock.put(
                            rawMaterialId,
                            currentStock - (required * maxProducible));
                }

                BigDecimal totalValue = product.getValue()
                        .multiply(BigDecimal.valueOf(maxProducible));

                grandTotal = grandTotal.add(totalValue);

                result.add(
                        new ProductionSuggestionItemDTO(
                                product.getId(),
                                product.getName(),
                                product.getValue(),
                                maxProducible,
                                totalValue));
            }
        }

        return new ProductionSuggestionDTO(result, grandTotal);
    }
}
