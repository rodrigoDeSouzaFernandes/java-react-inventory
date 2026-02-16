package com.autoflex.inventory.product;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.autoflex.inventory.product.DTO.ProductWithQuantityDTO;
import com.autoflex.inventory.relationship.ProductRawMaterial;
import com.autoflex.inventory.rawmaterial.RawMaterial;

class ProductServiceTest {

    ProductRepository productRepository;
    ProductService productService;

    @BeforeEach
    void setup() {
        productRepository = mock(ProductRepository.class);
        productService = new ProductService();
        productService.productRepository = productRepository;
    }

    @Test
    void shouldReturnZeroWhenNoRawMaterials() {
        Product product = new Product();
        product.setRawMaterials(List.of());

        int result = productService.calculateProducibleQuantity(product);

        assertEquals(0, result);
    }

    @Test
    void shouldCalculateMinimumProducibleQuantity() {
        RawMaterial rm1 = new RawMaterial();
        rm1.setStockQuantity(100);

        RawMaterial rm2 = new RawMaterial();
        rm2.setStockQuantity(50);

        ProductRawMaterial prm1 = new ProductRawMaterial();
        prm1.setRawMaterial(rm1);
        prm1.setRequiredQuantity(10);

        ProductRawMaterial prm2 = new ProductRawMaterial();
        prm2.setRawMaterial(rm2);
        prm2.setRequiredQuantity(5);

        Product product = new Product();
        product.setRawMaterials(List.of(prm1, prm2));

        int result = productService.calculateProducibleQuantity(product);

        assertEquals(10, result);
    }

    @Test
    void shouldReturnAllProductsWhenProductibleOnlyFalse() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Product");
        product.setValue(BigDecimal.valueOf(100));
        product.setRawMaterials(List.of());

        when(productRepository.listAll()).thenReturn(List.of(product));

        List<ProductWithQuantityDTO> result = productService.listProductsWithQuantity(false);

        assertEquals(1, result.size());
        assertEquals("Product", result.get(0).name);
    }

    @Test
    void shouldFilterProducibleProducts() {
        Product product1 = new Product();
        product1.setId(1L);
        product1.setName("Product 1");
        product1.setValue(BigDecimal.valueOf(100));
        product1.setRawMaterials(List.of());

        RawMaterial rm1 = new RawMaterial();
        rm1.setStockQuantity(100);

        RawMaterial rm2 = new RawMaterial();
        rm2.setStockQuantity(50);

        ProductRawMaterial prm1 = new ProductRawMaterial();
        prm1.setRawMaterial(rm1);
        prm1.setRequiredQuantity(10);

        ProductRawMaterial prm2 = new ProductRawMaterial();
        prm2.setRawMaterial(rm2);
        prm2.setRequiredQuantity(5);

        Product product2 = new Product();
        product2.setName("Product 2");
        product2.setRawMaterials(List.of(prm1, prm2));


        when(productRepository.listAll()).thenReturn(List.of(product1, product2));

        List<ProductWithQuantityDTO> result = productService.listProductsWithQuantity(true);

        assertEquals(1, result.size());
        assertEquals(product2.getName(), result.getFirst().name);
    }
}
