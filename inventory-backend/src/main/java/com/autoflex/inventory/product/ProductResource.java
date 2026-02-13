package com.autoflex.inventory.product;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    @Inject
    ProductService productService;

    @GET
    public List<ProductWithQuantityDTO> list(@QueryParam("productibleOnly") @DefaultValue("false") boolean productibleOnly) {
        // chama o service que já calcula a quantidade
        return productService.listProductsWithQuantity(productibleOnly);
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        Product product = productRepository.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        int producibleQty = productService.calculateProducibleQuantity(product);
        ProductWithQuantityDTO dto = new ProductWithQuantityDTO();
        dto.id = product.getId();
        dto.name = product.getName();
        dto.value = product.getValue();
        dto.producibleQuantity = producibleQty;

        return Response.ok(dto).build();
    }

    @POST
    @Transactional
    public Response create(Product product) {
        productRepository.persist(product);
        return Response
                .created(URI.create("/products/" + product.getId()))
                .entity(product)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Product updatedProduct) {
        Product product = productRepository.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        product.setName(updatedProduct.getName());
        product.setValue(updatedProduct.getValue());
        return Response.noContent().build(); 
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = productRepository.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build(); 
    }
}
