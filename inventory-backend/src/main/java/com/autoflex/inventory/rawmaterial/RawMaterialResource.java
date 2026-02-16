package com.autoflex.inventory.rawmaterial;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import com.autoflex.inventory.rawmaterial.DTO.RawMaterialCreateDTO;
import com.autoflex.inventory.rawmaterial.DTO.RawMaterialDTO;
import com.autoflex.inventory.relationship.ProductRawMaterialRepository;
import com.autoflex.inventory.shared.BusinessException;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @Inject
    RawMaterialRepository rawMaterialRepository;
    ProductRawMaterialRepository productRawMaterialRepository;

    @GET
    public List<RawMaterialDTO> list() {
        return rawMaterialRepository.listAll()
                .stream().map(rm -> {
                    RawMaterialDTO dto = new RawMaterialDTO();
                    dto.id = rm.getId();
                    dto.name = rm.getName();
                    dto.stockQuantity = rm.getStockQuantity();
                    return dto;
                }).collect(Collectors.toList());

    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id);

        if (rawMaterial == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        RawMaterialDTO dto = new RawMaterialDTO();
        dto.id = rawMaterial.getId();
        dto.name = rawMaterial.getName();
        dto.stockQuantity = rawMaterial.getStockQuantity();

        return Response.ok(dto).build();
    }

    @POST
    @Transactional
    public Response create(@Valid RawMaterialCreateDTO dto) {
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName(dto.name);
        rawMaterial.setStockQuantity(dto.stockQuantity);

        rawMaterialRepository.persist(rawMaterial);
        return Response
                .created(URI.create("/raw-materials/" + rawMaterial.getId()))
                .entity(rawMaterial)
                .build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, RawMaterial updated) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id);
        if (rawMaterial == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        rawMaterial.setName(updated.getName());
        rawMaterial.setStockQuantity(updated.getStockQuantity());
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = rawMaterialRepository.deleteById(id);
        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        boolean hasRelation = productRawMaterialRepository.count("rawMaterial.id", id) > 0;

        if (hasRelation) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new BusinessException("This material is related to a product"))
                    .build();
        }

        return Response.noContent().build();
    }
}
