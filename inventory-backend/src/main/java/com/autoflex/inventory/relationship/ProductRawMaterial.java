package com.autoflex.inventory.relationship;

import jakarta.persistence.*;
import com.autoflex.inventory.product.Product;
import com.autoflex.inventory.rawmaterial.RawMaterial;

@Entity
@Table(name = "product_raw_materials")
public class ProductRawMaterial {

    @EmbeddedId
    private ProductRawMaterialId id;

    @ManyToOne(optional = false)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(optional = false)
    @MapsId("rawMaterialId")
    @JoinColumn(name = "raw_material_id")
    private RawMaterial rawMaterial;

    @Column(nullable = false)
    private Integer requiredQuantity;

    public ProductRawMaterial() {}

    public ProductRawMaterial(Product product, RawMaterial rawMaterial, Integer requiredQuantity) {
        this.product = product;
        this.rawMaterial = rawMaterial;
        this.requiredQuantity = requiredQuantity;
        this.id = new ProductRawMaterialId(product.getId(), rawMaterial.getId());
    }

    // Getters e Setters
    public ProductRawMaterialId getId() { return id; }
    public void setId(ProductRawMaterialId id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public RawMaterial getRawMaterial() { return rawMaterial; }
    public void setRawMaterial(RawMaterial rawMaterial) { this.rawMaterial = rawMaterial; }

    public Integer getRequiredQuantity() { return requiredQuantity; }
    public void setRequiredQuantity(Integer requiredQuantity) { this.requiredQuantity = requiredQuantity; }
}
