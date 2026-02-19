package com.autoflex.inventory.production.DTO;

import java.math.BigDecimal;

public class ProductionSuggestionItemDTO {

    public Long productId;
    public String productName;
    public BigDecimal unitValue;
    public Integer producibleQuantity;
    public BigDecimal totalValue;

    public ProductionSuggestionItemDTO() {
    }

    public ProductionSuggestionItemDTO(Long productId,
            String productName,
            BigDecimal unitValue,
            Integer producibleQuantity,
            BigDecimal totalValue) {
        this.productId = productId;
        this.productName = productName;
        this.unitValue = unitValue;
        this.producibleQuantity = producibleQuantity;
        this.totalValue = totalValue;
    }
}
