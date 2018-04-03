package com.toyota.resource;

import com.toyota.domain.Company;

import com.toyota.dto.CompanyDto;
import com.toyota.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/company")
public class CompanyResource {
    @Autowired
    CompanyService companyService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllCities() {
        List<CompanyDto> companyDtoList;

        try {
            companyDtoList = companyService.findAllCompanies();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(companyDtoList).build();
    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveCity(CompanyDto companyDto) {
        Company company;

        try {
            company = companyService.saveCompany(companyDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(company).build();
    }
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCity(CompanyDto companyDto) {
        Company company;

        try {
            company = companyService.uptadeCompany(companyDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(company).build();
    }
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeCity(@PathParam("id") Integer id) {
        try {
            companyService.removeCompany(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }
}
