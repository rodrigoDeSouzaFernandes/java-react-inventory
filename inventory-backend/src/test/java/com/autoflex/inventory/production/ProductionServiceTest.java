package com.autoflex.inventory.production;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.autoflex.inventory.product.Product;
import com.autoflex.inventory.product.ProductRepository;
import com.autoflex.inventory.rawmaterial.RawMaterial;
import com.autoflex.inventory.rawmaterial.RawMaterialRepository;
import com.autoflex.inventory.relationship.ProductRawMaterial;

import io.quarkus.hibernate.orm.panache.PanacheQuery;

class ProductionServiceTest {

    ProductRepository productRepository;
    RawMaterialRepository rawMaterialRepository;
    ProductionService productionService;

    @BeforeEach
    void setup() {
        productRepository = mock(ProductRepository.class);
        rawMaterialRepository = mock(RawMaterialRepository.class);

        productionService = new ProductionService();
        productionService.productRepository = productRepository;
        productionService.rawMaterialRepository = rawMaterialRepository;
    }

    @Test
    void shouldCalculateProductionSuggestionCorrectly() {

        RawMaterial steel = new RawMaterial();
        steel.setId(1L);
        steel.setStockQuantity(100);

        RawMaterial plastic = new RawMaterial();
        plastic.setId(2L);
        plastic.setStockQuantity(50);

        when(rawMaterialRepository.listAll())
                .thenReturn(List.of(steel, plastic));

        Product product = new Product();
        product.setId(1L);
        product.setName("Product A");
        product.setValue(BigDecimal.valueOf(200));

        ProductRawMaterial prm1 = new ProductRawMaterial();
        prm1.setProduct(product);
        prm1.setRawMaterial(steel);
        prm1.setRequiredQuantity(10);

        ProductRawMaterial prm2 = new ProductRawMaterial();
        prm2.setProduct(product);
        prm2.setRawMaterial(plastic);
        prm2.setRequiredQuantity(5);

        product.setRawMaterials(List.of(prm1, prm2));

        PanacheQuery<Product> query = mock(PanacheQuery.class);

        when(productRepository.find(anyString(), any(Object[].class)))
                .thenReturn(query);

        when(query.list())
                .thenReturn(List.of(product));

        var result = productionService.calculateProductionSuggestion();

        assertNotNull(result);
        assertEquals(1, result.items.size());

        var item = result.items.getFirst();

        assertEquals("Product A", item.productName);
        assertEquals(10, item.producibleQuantity);
        assertEquals(BigDecimal.valueOf(2000), item.totalValue);
        assertEquals(BigDecimal.valueOf(2000), result.grandTotal);
    }
}
