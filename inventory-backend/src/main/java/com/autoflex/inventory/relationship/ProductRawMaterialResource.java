package com.autoflex.inventory.relationship;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

import com.autoflex.inventory.product.ProductRepository;
import com.autoflex.inventory.rawmaterial.RawMaterialRepository;

@Path("/product-raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialResource {

    @Inject
    ProductRawMaterialRepository productRawMaterialRepository;

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository rawMaterialRepository;

    // Listar todas as relações
    @GET
    public List<ProductRawMaterialDTO> list() {
        return productRawMaterialRepository.listAll()
                .stream()
                .map(prm -> {
                    ProductRawMaterialDTO dto = new ProductRawMaterialDTO();
                    dto.productId = prm.getProduct().getId();
                    dto.rawMaterialId = prm.getRawMaterial().getId();
                    dto.requiredQuantity = prm.getRequiredQuantity();
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @POST
    @Transactional
    public Response create(ProductRawMaterialDTO dto) {
        var product = productRepository.findById(dto.productId);
        var rawMaterial = rawMaterialRepository.findById(dto.rawMaterialId);

        if (product == null || rawMaterial == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Product or RawMaterial not found").build();
        }

        var existing = productRawMaterialRepository.findByIds(dto.productId, dto.rawMaterialId);
        if (existing != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("This product-rawMaterial relation already exists").build();
        }

        var prm = new ProductRawMaterial(product, rawMaterial, dto.requiredQuantity);
        productRawMaterialRepository.persist(prm);

        return Response.status(Response.Status.CREATED)
                .entity(dto)
                .build();
    }

    @PUT
    @Path("/{productId}/{rawMaterialId}")
    @Transactional
    public Response update(@PathParam("productId") Long productId,
                           @PathParam("rawMaterialId") Long rawMaterialId,
                           ProductRawMaterialDTO dto) {
        var prm = productRawMaterialRepository.findByIds(productId, rawMaterialId);
        if (prm == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        prm.setRequiredQuantity(dto.requiredQuantity);

        return Response.noContent().build();
    }

    @DELETE
    @Path("/{productId}/{rawMaterialId}")
    @Transactional
    public Response delete(@PathParam("productId") Long productId,
                           @PathParam("rawMaterialId") Long rawMaterialId) {
        var deleted = productRawMaterialRepository.deleteByIds(productId, rawMaterialId);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
