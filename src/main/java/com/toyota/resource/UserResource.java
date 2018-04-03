package com.toyota.resource;

import com.toyota.domain.City;
import com.toyota.domain.User;
import com.toyota.dto.CityDto;
import com.toyota.dto.UserDto;
import com.toyota.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Component
@Path("/user")
public class UserResource
{
    @Autowired
    UserService userService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllUsers() {
        List<UserDto> userDtoList;

        try {
            userDtoList = userService.findAllUsers();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(userDtoList).build();
    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveUser(UserDto userDto) {
        User user;

        try {
            user = userService.saveUser(userDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(user).build();
    }
    @PUT
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(UserDto userDto) {
        User user;

        try {
            user = userService.updateUser(userDto);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok(user).build();
    }
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeUser(@PathParam("id") Integer id) {
        try {
            userService.removeUser(id);
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }

        return Response.ok().build();
    }
}
