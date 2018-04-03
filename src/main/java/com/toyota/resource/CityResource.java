package com.toyota.resource;

import com.toyota.domain.City;
import com.toyota.dto.CityDto;
import com.toyota.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
@Component
@Path("/city")
public class CityResource {
    @Autowired
    CityService cityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllCities() {
        List<CityDto> cityDtoList;

        try {
            cityDtoList = cityService.findAllCities();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(cityDtoList).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveCity(CityDto cityDto) {
        City city;

        try {
            city = cityService.saveCity(cityDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(city).build();
    }

    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCity(CityDto cityDto) {
        City city;

        try {
            city = cityService.updateCity(cityDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(city).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeCity(@PathParam("id") Integer id) {
        try {
            cityService.removeCity(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }

}
