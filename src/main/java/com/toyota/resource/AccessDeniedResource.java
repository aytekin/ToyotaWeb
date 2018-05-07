package com.toyota.resource;

import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.*;

@Component
@Path("/accessDenied")
public class AccessDeniedResource {

    @GET
    @Produces({MediaType.TEXT_HTML})
    public InputStream accessDenied() throws FileNotFoundException {
        System.out.println("Burada yonlendirme nasil yapilir buna bakmaniz gerekecek. Ben bulamadim.");
        return new FileInputStream(new File("src/main/webapp/accessDenied.html"));
    }

}
