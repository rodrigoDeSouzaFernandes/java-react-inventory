package com.autoflex.inventory.product;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    @GET
    public List<Product> list() {
        return productRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Product findById(@PathParam("id") Long id) {
        return productRepository.findById(id);
    }

    @POST
    @Transactional
    public void create(Product product) {
        productRepository.persist(product);
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public void update(@PathParam("id") Long id, Product updatedProduct) {
        Product product = productRepository.findById(id);
        if (product == null) {
            throw new NotFoundException();
        }
        product.setName(updatedProduct.getName());
        product.setValue(updatedProduct.getValue());
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        productRepository.deleteById(id);
    }
}
