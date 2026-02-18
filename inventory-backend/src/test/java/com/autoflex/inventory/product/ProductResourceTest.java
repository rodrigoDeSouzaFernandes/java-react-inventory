package com.autoflex.inventory.product;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.autoflex.inventory.product.DTO.ProductCreateDTO;
import com.autoflex.inventory.product.DTO.ProductUpdateDTO;
import com.autoflex.inventory.product.DTO.ProductWithMaterialsDTO;
import com.autoflex.inventory.product.DTO.ProductWithQuantityDTO;

class ProductResourceTest {

    ProductRepository productRepository;
    ProductService productService;
    ProductResource productResource;

    @BeforeEach
    void setup() {
        productRepository = mock(ProductRepository.class);
        productService = mock(ProductService.class);
        productResource = new ProductResource();
        productResource.productRepository = productRepository;
        productResource.productService = productService;
    }

    @Test
    void testList() {
        List<ProductWithQuantityDTO> mockList = new ArrayList<>();
        ProductWithQuantityDTO dto = new ProductWithQuantityDTO();
        dto.id = 1L;
        dto.name = "Product 1";
        dto.value = BigDecimal.valueOf(100.0);
        dto.producibleQuantity = 10;
        mockList.add(dto);

        when(productService.listProductsWithQuantity(false)).thenReturn(mockList);

        List<ProductWithQuantityDTO> result = productResource.list(false);
        assertEquals(1, result.size());
        assertEquals("Product 1", result.get(0).name);
        assertEquals(BigDecimal.valueOf(100.0), result.get(0).value);
    }

    @Test
    void testFindByIdFound() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Product 1");
        product.setValue(BigDecimal.valueOf(100.0));
        product.setRawMaterials(new ArrayList<>());

        when(productRepository.findById(1L)).thenReturn(product);
        when(productService.calculateProducibleQuantity(product)).thenReturn(10);

        Response response = productResource.findById(1L);
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());

        ProductWithMaterialsDTO dto = (ProductWithMaterialsDTO) response.getEntity();
        assertEquals("Product 1", dto.name);
        assertEquals(BigDecimal.valueOf(100.0), dto.value);
        assertEquals(10, dto.producibleQuantity);
    }

    @Test
    void testFindByIdNotFound() {
        when(productRepository.findById(1L)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> {
            productResource.findById(1L);
        });
    }

    @Test
    void testCreate() {
        ProductCreateDTO dto = new ProductCreateDTO();
        dto.name = "New Product";
        dto.value = BigDecimal.valueOf(150.0);

        doAnswer(invocation -> {
            Product product = invocation.getArgument(0);
            product.setId(1L);
            return null;
        }).when(productRepository).persist(any(Product.class));

        Response response = productResource.create(dto);
        assertEquals(Response.Status.CREATED.getStatusCode(), response.getStatus());

        ProductWithQuantityDTO createdProduct = (ProductWithQuantityDTO) response.getEntity();
        assertEquals("New Product", createdProduct.name);
        assertEquals(BigDecimal.valueOf(150.0), createdProduct.value);
        assertNotNull(createdProduct.id);
    }

    @Test
    void testUpdateFound() {
        ProductUpdateDTO updated = new ProductUpdateDTO();
        updated.name = "New name";
        updated.value = BigDecimal.valueOf(200.0);

        Product existing = new Product();
        existing.setId(1L);
        existing.setName("Old name");
        existing.setValue(BigDecimal.valueOf(100.0));

        when(productRepository.findById(1L)).thenReturn(existing);

        Response response = productResource.update(1L, updated);
        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());

        assertEquals("New name", existing.getName());
        assertEquals(BigDecimal.valueOf(200.0), existing.getValue());
    }

    @Test
    void testUpdateNotFound() {
        when(productRepository.findById(1L)).thenReturn(null);
        ProductUpdateDTO dto = new ProductUpdateDTO();

        assertThrows(NotFoundException.class, () -> {
            productResource.update(1L, dto);
        });
    }

    @Test
    void testDeleteFound() {
        Product product = new Product();
        product.setId(1L);

        when(productRepository.findById(1L)).thenReturn(product);

        Response response = productResource.delete(1L);

        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());
        verify(productRepository).deleteById(1L);
    }

    @Test
    void testDeleteNotFound() {
        when(productRepository.deleteById(1L)).thenReturn(false);
        assertThrows(NotFoundException.class, () -> {
            productResource.delete(1L);
        });
    }
}
