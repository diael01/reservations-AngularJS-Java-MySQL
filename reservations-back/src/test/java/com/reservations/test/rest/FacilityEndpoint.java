package com.reservations.test.rest;

import com.reservations.back.models.DBType;
import com.reservations.back.models.Facility;
import com.reservations.back.repositories.DBUtil;
import com.reservations.back.repositories.FacilityRepository;

import javax.inject.Inject;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.io.File;
import java.sql.SQLException;
import java.util.List;


import com.reservations.back.rest.IFacilityEndpoint;
import com.reservations.back.rest.JAXRSConfiguration;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;

//@RunWith(Arquillian.class)
//@RunAsClient
public class FacilityEndpoint implements IFacilityEndpoint {

    @Inject
    private FacilityRepository facilityRepository;

    //@Deployment(testable = false)
    public static Archive<?> createDeploymentPackage() {

        return ShrinkWrap.create(WebArchive.class)
                .addPackage(FacilityEndpoint.class.getPackage())
                .addClass(Facility.class)
                .addClass(FacilityRepository.class)
                .addClass(FacilityEndpoint.class)
                .addClass(JAXRSConfiguration.class)
                .addClass(DBUtil.class)
                .addClass(DBType.class)
                .addAsLibraries(new File("target/test-libs/mysql-connector-java-5.1.45-bin.jar"));
    }

    public @Override Response getFacilities() throws SQLException {
        List<Facility> facilities = facilityRepository.getFacilities();
        if (facilities.size() == 0)
            return Response.status(Response.Status.NO_CONTENT).build();
        return Response.ok(facilities)
                .header("Access-Control-Allow-Origin", "http://localhost:5000")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .build();
    }


    public @Override Response getFacilitiesByCriteria(@PathParam("criteria") final String criteria) throws SQLException {
        List<Facility> facilities = facilityRepository.getFacilitiesByCriteria(criteria);
        if (facilities.size() == 0)
            return Response.status(Response.Status.NO_CONTENT).build();

        return Response.ok(facilities)
                .header("Access-Control-Allow-Origin", "http://localhost:5000")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Headers",
                        "origin, content-type, accept, authorization")
                .header("Access-Control-Allow-Methods",
                        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
                .build();
    }
}
