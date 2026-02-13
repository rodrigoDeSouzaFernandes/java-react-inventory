package com.autoflex.inventory.product.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class ProductCreateDTO {

    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name cannot be empty")
    public String name;

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be greater than 0")
    public BigDecimal value;
}
