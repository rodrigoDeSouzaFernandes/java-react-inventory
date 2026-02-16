package com.autoflex.inventory.product.DTO;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class ProductUpdateDTO {

    @Size(min = 1, message = "Name cannot be empty")
    public String name;

    @Positive(message = "Value must be greater than 0")
    public BigDecimal value;
}
