//package com.reservations.test.repository;
//
//import com.reservations.back.models.DBType;
//import com.reservations.back.repositories.DBUtil;
//import com.reservations.back.repositories.FacilityRepository;
//import org.jboss.arquillian.junit.Arquillian;
//import org.jboss.arquillian.junit.InSequence;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//
//import javax.inject.Inject;
//import java.sql.*;
//
//
//@RunWith(Arquillian.class)
//public class TestMySQLConnection {
//
//	@Inject
//	private FacilityRepository facilityRepository;
//
//	@Test
//	@InSequence(1)
//	public void shouldConnectSuccessful() throws SQLException {
//		Connection conn = null;
//		try {
//			conn = DBUtil.getConnection(DBType.MYSQLDB);
//		} catch (SQLException e) {
//			System.err.println(e.getMessage());
//		}
//		finally{
//			if(conn != null)
//			  conn.close();
//		}
//	}
//}
