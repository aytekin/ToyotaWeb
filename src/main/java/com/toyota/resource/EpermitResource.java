package com.toyota.resource;

import com.toyota.domain.Epermit;
import com.toyota.dto.EpermitDto;
import com.toyota.service.EpermitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/epermit")
public class EpermitResource {

    @Autowired
    EpermitService epermitService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllEpremits(){
        List<EpermitDto> epermitDtoList;

        try{
            epermitDtoList = epermitService.findAllEpermits();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(epermitDtoList).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveEpermit(EpermitDto epermitDto){
        Epermit epermit;

        try{
            epermit = epermitService.saveEpermit(epermitDto);
        }catch(Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(epermit).build();
    }

    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateEpermit(EpermitDto epermitDto){
        Epermit epermit;

        try {
            epermit = epermitService.uptadeEpermit(epermitDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(epermit).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeEpermit(@PathParam("id") Integer id) {
        try {
            epermitService.removeEpermit(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }
}
