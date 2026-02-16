package com.autoflex.inventory.rawmaterial;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RawMaterialResourceTest {

    RawMaterialRepository rawMaterialRepository;
    RawMaterialResource rawMaterialResource;

    @BeforeEach
    void setup() {
        rawMaterialRepository = mock(RawMaterialRepository.class);
        rawMaterialResource = new RawMaterialResource();
        rawMaterialResource.rawMaterialRepository = rawMaterialRepository;
    }

    
}
