package com.autoflex.inventory.product.DTO;

import java.math.BigDecimal;
import java.util.List;

public class ProductWithMaterialsDTO {
    public Long id;
    public String name;
    public BigDecimal value;
    public int producibleQuantity;
    public List<ProductMaterialDTO> materials;
}
