package com.reservations.back.repositories;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import com.reservations.back.models.DBType;

public class DBUtil {
	private static final String mySqlUser = "root";
	private static final String mySqlPwd = "admin";
	private static final String mySQLCS = "jdbc:mysql://localhost:3306/world?autoReconnect=true&useSSL=false";
	private static final String oraUser="";
	private static final String oraPwd ="";
	private static final String oraCS = "";

public static Connection getConnection(DBType dbType) throws SQLException {
	switch (dbType) {
	case ORADB:
		return DriverManager.getConnection(oraCS, oraUser, oraPwd);
	case MYSQLDB:
		return DriverManager.getConnection(mySQLCS, mySqlUser, mySqlPwd);

	default:
		return null;
	}
}

public static void showErrorMessage(SQLException e){
	System.err.println("Error :" + e.getMessage());
	System.err.println("Error Code :" + e.getErrorCode());
}
}
