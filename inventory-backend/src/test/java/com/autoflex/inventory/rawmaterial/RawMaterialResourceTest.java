package com.autoflex.inventory.rawmaterial;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;

import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.autoflex.inventory.rawmaterial.DTO.RawMaterialCreateDTO;
import com.autoflex.inventory.rawmaterial.DTO.RawMaterialDTO;
import com.autoflex.inventory.rawmaterial.DTO.RawMaterialUpdateDTO;
import com.autoflex.inventory.relationship.ProductRawMaterialRepository;

public class RawMaterialResourceTest {

    ProductRawMaterialRepository productRawMaterialRepository;
    RawMaterialRepository rawMaterialRepository;
    RawMaterialResource rawMaterialResource;

    @BeforeEach
    void setup() {
        productRawMaterialRepository = mock(ProductRawMaterialRepository.class);
        rawMaterialRepository = mock(RawMaterialRepository.class);
        rawMaterialResource = new RawMaterialResource();
        rawMaterialResource.rawMaterialRepository = rawMaterialRepository;
        rawMaterialResource.productRawMaterialRepository = productRawMaterialRepository;
    }

    @Test
    void testList() {

        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("Plastic");
        rawMaterial.setStockQuantity(200);

        when(rawMaterialRepository.listAll()).thenReturn(List.of(rawMaterial));

        List<RawMaterialDTO> result = rawMaterialResource.list();

        assertEquals(result.getFirst().id, rawMaterial.getId());
        assertEquals(result.getFirst().name, rawMaterial.getName());
        assertEquals(result.getFirst().stockQuantity, rawMaterial.getStockQuantity());
    }

    @Test
    void testFindByIdFound() {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("Plastic");
        rawMaterial.setStockQuantity(200);

        when(rawMaterialRepository.findById(1L)).thenReturn(rawMaterial);

        Response result = rawMaterialResource.findById(1L);

        RawMaterialDTO dto = (RawMaterialDTO) result.getEntity();

        assertEquals(result.getStatus(), 200);
        assertEquals(dto.id, rawMaterial.getId());
        assertEquals(dto.name, rawMaterial.getName());
        assertEquals(dto.stockQuantity, rawMaterial.getStockQuantity());
    }

    @Test
    void testFindByIdNotFound() {
        when(rawMaterialRepository.findById(1L)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> {
            rawMaterialResource.findById(1L);
        });
    }

    @Test
    void testCreate() {
        RawMaterialCreateDTO dto = new RawMaterialCreateDTO();
        dto.name = "Plastic";
        dto.stockQuantity = 58;

        doAnswer(invocation -> {
            RawMaterial rm = invocation.getArgument(0);
            rm.setId(1L);
            return null;
        }).when(rawMaterialRepository).persist(any(RawMaterial.class));

        Response result = rawMaterialResource.create(dto);
        RawMaterial created = (RawMaterial) result.getEntity();

        assertEquals(Response.Status.CREATED.getStatusCode(), result.getStatus());
        assertEquals("Plastic", created.getName());
        assertEquals(58, created.getStockQuantity());
        assertEquals(1L, created.getId());
    }

    @Test
    void testUpdateFound() {

        RawMaterial existing = new RawMaterial();
        existing.setId(1L);
        existing.setName("Old name");
        existing.setStockQuantity(100);

        when(rawMaterialRepository.findById(1L)).thenReturn(existing);

        RawMaterialUpdateDTO updated = new RawMaterialUpdateDTO();
        updated.name = "New name";
        updated.stockQuantity = 200;

        Response response = rawMaterialResource.update(1L, updated);

        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());
        assertEquals("New name", existing.getName());
        assertEquals(200, existing.getStockQuantity());
    }

    @Test
    void testUpdateNotFound() {
        when(rawMaterialRepository.findById(1L)).thenReturn(null);
        RawMaterialUpdateDTO updated = new RawMaterialUpdateDTO();
        updated.name = "New name";
        updated.stockQuantity = 200;

        assertThrows(NotFoundException.class, () -> {
            rawMaterialResource.update(1L, updated);
        });
    }

    @Test
    void testDeleteFound() {
        RawMaterial existing = new RawMaterial();
        existing.setId(1L);

        when(rawMaterialRepository.findById(1L)).thenReturn(existing);
        when(productRawMaterialRepository.count("rawMaterial.id", 1L)).thenReturn(0L);
        when(rawMaterialRepository.deleteById(1L)).thenReturn(true);

        Response response = rawMaterialResource.delete(1L);
        assertEquals(Response.Status.NO_CONTENT.getStatusCode(), response.getStatus());
    }

    @Test
    void testDeleteNotFound() {
        when(rawMaterialRepository.deleteById(1L)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> {
            rawMaterialResource.delete(1L);
        });
    }
}
