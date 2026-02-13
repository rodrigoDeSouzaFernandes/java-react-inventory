package com.autoflex.inventory.relationship;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ProductRawMaterialId implements Serializable {

    private Long productId;
    private Long rawMaterialId;

    public ProductRawMaterialId() {
    }

    public ProductRawMaterialId(Long productId, Long rawMaterialId) {
        this.productId = productId;
        this.rawMaterialId = rawMaterialId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ProductRawMaterialId))
            return false;
        ProductRawMaterialId that = (ProductRawMaterialId) o;
        return Objects.equals(productId, that.productId) &&
                Objects.equals(rawMaterialId, that.rawMaterialId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, rawMaterialId);
    }
}
