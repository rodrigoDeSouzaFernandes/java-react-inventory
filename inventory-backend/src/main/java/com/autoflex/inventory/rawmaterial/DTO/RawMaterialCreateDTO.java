package com.autoflex.inventory.rawmaterial.DTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class RawMaterialCreateDTO {

    @NotNull(message = "Name is required")
    @Size(min = 1, message = "Name cannot be empty")
    public String name;

    @NotNull(message = "Value is required")
    @Positive(message = "Value must be greater than 0")
    public Integer stockQuantity;
}
