package com.autoflex.inventory.product;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

import com.autoflex.inventory.product.DTO.ProductCreateDTO;
import com.autoflex.inventory.product.DTO.ProductWithQuantityDTO;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository productRepository;

    @Inject
    ProductService productService;

    @GET
    public List<ProductWithQuantityDTO> list(
            @QueryParam("productibleOnly") @DefaultValue("false") boolean productibleOnly) {

        return productService.listProductsWithQuantity(productibleOnly);
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        Product product = productRepository.findById(id);
        if (product == null) {
            throw new NotFoundException("Product not found");
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
    public Response create(@Valid ProductCreateDTO dto) {

        Product product = new Product();
        product.setName(dto.name);
        product.setValue(dto.value);

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
            throw new NotFoundException("Product not found");
        }
        product.setName(updatedProduct.getName());
        product.setValue(updatedProduct.getValue());
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {

        boolean exists = productRepository.findById(id) != null;

        if (!exists) {
            throw new NotFoundException("Product not found");
        }

        productRepository.deleteById(id);

        return Response.noContent().build();
    }
}
