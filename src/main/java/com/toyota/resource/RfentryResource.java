package com.toyota.resource;

import com.toyota.domain.Rfentry;
import com.toyota.dto.RfentryDto;
import com.toyota.service.RfentryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/rfentry")
public class RfentryResource {

    @Autowired
    RfentryService rfentryService;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllRfentries(){

        List<RfentryDto> rfentryDtoList;

        try{
            rfentryDtoList = rfentryService.findAllRfentry();
        }catch(Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(rfentryDtoList).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveRfentry(RfentryDto rfentryDto){
        Rfentry rfentry;

        try{
            rfentry = rfentryService.saveRfentry(rfentryDto);
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(rfentry).build();
    }

    @PUT
    @Path("/{rfentryId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateRfentry(RfentryDto rfentryDto){
        Rfentry rfentry;

        try{
            rfentry = rfentryService.updateRfentry(rfentryDto);
        }catch(Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok(rfentry).build();
    }

    @DELETE
    @Path("/{rfentryId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeRfentry(@PathParam("rfentryId") Integer id){
        try{
            rfentryService.removeRfentry(id);
        }catch(Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok().build();
    }


}













