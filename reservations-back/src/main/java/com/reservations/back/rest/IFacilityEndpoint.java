package com.reservations.back.rest;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.sql.SQLException;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;


@Path("facilities")
public interface IFacilityEndpoint {

    @GET
    @Produces(APPLICATION_JSON)
    @Path("/getFacilitiesByCriteria/{criteria}")
    public Response getFacilitiesByCriteria(@PathParam("criteria") final String criteria) throws SQLException;

    @GET
    @Produces(APPLICATION_JSON)
    @Path("/getFacilities")
    public Response getFacilities() throws SQLException;


}
