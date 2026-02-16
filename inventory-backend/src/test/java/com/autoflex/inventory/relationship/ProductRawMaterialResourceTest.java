package com.autoflex.inventory.relationship;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.autoflex.inventory.product.Product;
import com.autoflex.inventory.product.ProductRepository;
import com.autoflex.inventory.rawmaterial.RawMaterial;
import com.autoflex.inventory.rawmaterial.RawMaterialRepository;

class ProductRawMaterialResourceTest {

        ProductRawMaterialRepository productRawMaterialRepository;
        ProductRepository productRepository;
        RawMaterialRepository rawMaterialRepository;

        ProductRawMaterialResource resource;

        @BeforeEach
        void setup() {
                productRawMaterialRepository = mock(ProductRawMaterialRepository.class);
                productRepository = mock(ProductRepository.class);
                rawMaterialRepository = mock(RawMaterialRepository.class);

                resource = new ProductRawMaterialResource();
                resource.productRawMaterialRepository = productRawMaterialRepository;
                resource.productRepository = productRepository;
                resource.rawMaterialRepository = rawMaterialRepository;
        }

        @Test
        void testList() {
                Product product = new Product();
                product.setId(1L);

                RawMaterial rawMaterial = new RawMaterial();
                rawMaterial.setId(2L);

                ProductRawMaterial prm = new ProductRawMaterial(product, rawMaterial, 5);

                when(productRawMaterialRepository.listAll())
                                .thenReturn(List.of(prm));

                List<ProductRawMaterialDTO> result = resource.list();

                assertEquals(1, result.size());
                assertEquals(1L, result.get(0).productId);
                assertEquals(2L, result.get(0).rawMaterialId);
                assertEquals(5, result.get(0).requiredQuantity);
        }

        @Test
        void testCreateSuccess() {
                Product product = new Product();
                product.setId(1L);

                RawMaterial rawMaterial = new RawMaterial();
                rawMaterial.setId(2L);

                ProductRawMaterialDTO dto = new ProductRawMaterialDTO();
                dto.productId = 1L;
                dto.rawMaterialId = 2L;
                dto.requiredQuantity = 10;

                when(productRepository.findById(1L)).thenReturn(product);
                when(rawMaterialRepository.findById(2L)).thenReturn(rawMaterial);
                when(productRawMaterialRepository.findByIds(1L, 2L))
                                .thenReturn(null);

                Response response = resource.create(dto);

                assertEquals(201, response.getStatus());
                verify(productRawMaterialRepository)
                                .persist(any(ProductRawMaterial.class));
        }

        @Test
        void testCreateProductOrRawMaterialNotFound() {
                ProductRawMaterialDTO dto = new ProductRawMaterialDTO();
                dto.productId = 1L;
                dto.rawMaterialId = 2L;

                when(productRepository.findById(1L)).thenReturn(null);

                Response response = resource.create(dto);

                assertEquals(400, response.getStatus());
        }

        @Test
        void testCreateConflict() {
                Product product = new Product();
                product.setId(1L);

                RawMaterial rawMaterial = new RawMaterial();
                rawMaterial.setId(2L);

                ProductRawMaterial existing = new ProductRawMaterial(product, rawMaterial, 5);

                ProductRawMaterialDTO dto = new ProductRawMaterialDTO();
                dto.productId = 1L;
                dto.rawMaterialId = 2L;

                when(productRepository.findById(1L)).thenReturn(product);
                when(rawMaterialRepository.findById(2L)).thenReturn(rawMaterial);
                when(productRawMaterialRepository.findByIds(1L, 2L))
                                .thenReturn(existing);

                Response response = resource.create(dto);

                assertEquals(409, response.getStatus());
        }

        @Test
        void testUpdateSuccess() {
                Product product = new Product();
                product.setId(1L);

                RawMaterial rawMaterial = new RawMaterial();
                rawMaterial.setId(2L);

                ProductRawMaterial prm = new ProductRawMaterial(product, rawMaterial, 5);

                when(productRawMaterialRepository.findByIds(1L, 2L))
                                .thenReturn(prm);

                ProductRawMaterialDTO dto = new ProductRawMaterialDTO();
                dto.requiredQuantity = 20;

                Response response = resource.update(1L, 2L, dto);

                assertEquals(204, response.getStatus());
                assertEquals(20, prm.getRequiredQuantity());
        }

        @Test
        void testUpdateNotFound() {
                when(productRawMaterialRepository.findByIds(1L, 2L))
                                .thenReturn(null);

                ProductRawMaterialDTO dto = new ProductRawMaterialDTO();

                Response response = resource.update(1L, 2L, dto);

                assertEquals(404, response.getStatus());
        }

        @Test
        void testDeleteSuccess() {
                when(productRawMaterialRepository.deleteByIds(1L, 2L))
                                .thenReturn(true);

                Response response = resource.delete(1L, 2L);

                assertEquals(204, response.getStatus());
        }

        @Test
        void testDeleteNotFound() {
                when(productRawMaterialRepository.deleteByIds(1L, 2L))
                                .thenReturn(false);

                Response response = resource.delete(1L, 2L);

                assertEquals(404, response.getStatus());
        }
}
