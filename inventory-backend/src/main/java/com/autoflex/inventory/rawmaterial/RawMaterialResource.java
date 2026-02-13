package com.autoflex.inventory.rawmaterial;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @Inject
    RawMaterialRepository rawMaterialRepository;

    @GET
    public List<RawMaterial> list() {
        return rawMaterialRepository.listAll();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        RawMaterial rawMaterial = rawMaterialRepository.findById(id);
        if (rawMaterial == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(rawMaterial).build();
    }

    @POST
    @Transactional
    public Response create(RawMaterial rawMaterial) {
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
        return Response.noContent().build();
    }
}
