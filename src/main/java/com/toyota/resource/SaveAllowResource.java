package com.toyota.resource;

import com.toyota.domain.SaveAllow;
import com.toyota.dto.SaveAllowDto;
import com.toyota.service.SaveAllowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/saveAllow")
public class SaveAllowResource {
    @Autowired
    SaveAllowService saveAllowService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllSaveAllowes()
    {
        List<SaveAllowDto> saveAllowDtoList;
        try {
            saveAllowDtoList = saveAllowService.findAllSaveAllowes();
        }
        catch (Exception e)
        {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok(saveAllowDtoList).build();
    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveSaveAllow(SaveAllowDto saveAllowDto) {
        SaveAllow saveAllow;

        try {
            saveAllow = saveAllowService.saveAllow(saveAllowDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(saveAllow).build();
    }
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateSaveAllow(SaveAllowDto saveAllowDto) {
        SaveAllow saveAllow;

        try {
            saveAllow = saveAllowService.updateSaveAllow(saveAllowDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(saveAllow).build();
    }
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeCity(@PathParam("id") Integer id) {
        try {
            saveAllowService.removeSaveAllow(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }
}
