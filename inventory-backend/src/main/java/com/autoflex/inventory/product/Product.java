package com.autoflex.inventory.product;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

import com.autoflex.inventory.relationship.ProductRawMaterial;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal value;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductRawMaterial> rawMaterials;

    public Product() {
    }

    public Product(String name, BigDecimal value) {
        this.name = name;
        this.value = value;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getValue() {
        return value;
    }

    public List<ProductRawMaterial> getRawMaterials() {
        return rawMaterials;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public void setRawMaterials(List<ProductRawMaterial> rawMaterials) {
        this.rawMaterials = rawMaterials;
    }
}
