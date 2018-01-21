package com.reservations.test.repository;

import com.reservations.back.models.DBType;
import com.reservations.back.repositories.DBUtil;
import com.reservations.back.repositories.FacilityRepository;
import com.reservations.back.models.Facility;
//import com.reservations.back.rest.FacilityEndpoint;
import com.reservations.test.rest.FacilityEndpoint;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import javax.inject.Inject;
import static org.junit.Assert.*;
import java.io.File;
import java.sql.*;


@RunWith(Arquillian.class)
public class FacilityRepositoryTest {

    // ======================================
    // =          Injection Points          =
    // ======================================

    @Inject
    private FacilityRepository facilityRepository;

    // ======================================
    // =             Deployment             =
    // ======================================

    @Deployment(testable = true)
    public static Archive<?> createDeploymentPackage() {

        return ShrinkWrap.create(WebArchive.class)
                .addClass(Facility.class)
                .addClass(FacilityRepository.class)
                .addClass(FacilityEndpoint.class)
                .addClass(DBUtil.class)
                .addClass(DBType.class)
                .addAsLibraries(new File("target/test-libs/mysql-connector-java-5.1.45-bin.jar"));
    }


    @Test
    @InSequence(1)
    public void shouldGetAllFacilities() throws SQLException {

        // Find all
        assertEquals(10, facilityRepository.getFacilities().size());
    }

    @Test
    @InSequence(2)
    public void shouldGetAllFacilitiesByCriteria() throws SQLException {

        // Find all
        assertEquals(1, facilityRepository.getFacilitiesByCriteria("Flushing Bay").size());
    }

}
