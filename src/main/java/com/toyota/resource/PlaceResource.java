package com.toyota.resource;

import com.toyota.domain.Place;
import com.toyota.dto.PlaceDto;
import com.toyota.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/place")
public class PlaceResource {
    @Autowired
    PlaceService placeService ;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllPlaces(){
        List<PlaceDto> placeDtoList;
        try{
            placeDtoList = placeService.findAllPlaces();
        }catch (Exception e){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok(placeDtoList).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response savePlace(PlaceDto placeDto) {
        Place place;

        try {
            place = placeService.savePlace(placeDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(place).build();
    }

    @PUT
    @Path("/{placeId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePlace(PlaceDto placeDto) {
        Place place;

        try {
            place = placeService.updatePlace(placeDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(place).build();
    }

    @DELETE
    @Path("/{placeId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removePlace(@PathParam("placeId") Integer placeId) {
        try {
            placeService.removePlace(placeId);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }


}
