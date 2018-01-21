//package com.reservations.test.rest;
//
//import com.reservations.back.models.DBType;
//import com.reservations.back.models.Facility;
//import com.reservations.back.repositories.DBUtil;
//import com.reservations.back.repositories.FacilityRepository;
////import com.reservations.back.rest.FacilityEndpoint;
//import com.reservations.back.rest.IFacilityEndpoint;
//import com.reservations.back.rest.JAXRSConfiguration;
//import org.jboss.arquillian.container.test.api.Deployment;
//import org.jboss.arquillian.container.test.api.RunAsClient;
//import org.jboss.arquillian.extension.rest.client.ArquillianResteasyResource;
//import org.jboss.arquillian.junit.Arquillian;
//import org.jboss.arquillian.junit.InSequence;
//import org.jboss.shrinkwrap.api.Archive;
//import org.jboss.shrinkwrap.api.ShrinkWrap;
//import org.jboss.shrinkwrap.api.spec.WebArchive;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//
//import javax.ws.rs.Consumes;
//import javax.ws.rs.Produces;
//import javax.ws.rs.client.WebTarget;
//import javax.ws.rs.core.Response;
//import java.io.File;
//import java.sql.SQLException;
//import java.util.List;
//
//import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
//import static javax.ws.rs.core.Response.Status.*;
//import static org.junit.Assert.*;
//
//
//@RunWith(Arquillian.class)
//@RunAsClient
//public class FacilityEndpointTest {
//
//    // ======================================
//    // =             Attributes             =
//    // ======================================
//
//    private Response response;
//
//    // ======================================
//    // =             Deployment             =
//    // ======================================
//
//    @Deployment(testable = true)
//    public static Archive<?> createDeploymentPackage() {
//
//        return ShrinkWrap.create(WebArchive.class)
//                .addPackage(FacilityEndpoint.class.getPackage())
//            .addClass(Facility.class)
//            .addClass(FacilityRepository.class)
//            .addClass(FacilityEndpoint.class)
//            .addClass(JAXRSConfiguration.class)
//            .addClass(DBUtil.class)
//                .addClass(DBType.class)
//                .addAsLibraries(new File("target/test-libs/mysql-connector-java-5.1.45-bin.jar"));
//
//    }
//
//    // ======================================
//    // =            Test methods            =
//    // ======================================
//
//    @Test
//    @InSequence(1)
//    public void shouldGetAllFacilities(@ArquillianResteasyResource("api/facilities") WebTarget webTarget) {
//        // Find all
//        response = webTarget.request(APPLICATION_JSON).get();
//        assertEquals(OK.getStatusCode(), response.getStatus());
//        assertEquals(10, response.readEntity(List.class).size());
//    }
//
//    @Test
//    @InSequence(2)
//    public void shouldGetAllFacilitiesByCriteria(@ArquillianResteasyResource("api/facilities/Flushing Bay") WebTarget webTarget) {
//        // Find all
//        response = webTarget.request(APPLICATION_JSON).get();
//        assertEquals(OK.getStatusCode(), response.getStatus());
//        assertEquals(1, response.readEntity(List.class).size());
//    }
//
//
//
//
//
//
//
//
//
////    @Test
////    @InSequence(1)
////    @Consumes(APPLICATION_JSON)
////    public void shouldGetAllFacilitiesByCriteria(@ArquillianResteasyResource IFacilityEndpoint ep) throws SQLException {
////        // Find all
////        //response = webTarget.request(APPLICATION_JSON).get();
////        response = ep.getFacilitiesByCriteria("Flushing Bay");
////        assertEquals(OK.getStatusCode(), response.getStatus());
////        assertEquals(1, response.readEntity(List.class).size());
////    }
////
////    @Test
////    @InSequence(1)
////    @Consumes(APPLICATION_JSON)
////    public void shouldGetAllFacilitiesByCriteria(@ArquillianResteasyResource IFacilityEndpoint ep) throws SQLException {
////        // Find all
////        //response = webTarget.request(APPLICATION_JSON).get();
////        response = ep.getFacilitiesByCriteria("Flushing Bay");
////        assertEquals(OK.getStatusCode(), response.getStatus());
////        assertEquals(1, response.readEntity(List.class).size());
////    }
//}
