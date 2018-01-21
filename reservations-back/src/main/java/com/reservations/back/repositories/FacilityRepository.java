package com.reservations.back.repositories;
import com.reservations.back.models.DBType;
import com.reservations.back.models.Facility;
import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.*;
import java.sql.*;
import java.util.stream.Collectors;

import static javax.transaction.Transactional.TxType.SUPPORTS;

@Transactional(SUPPORTS)
public class FacilityRepository {

    public static ArrayList<Facility> getFacilities() throws SQLException {
        ArrayList<Facility> facilitiesList = new ArrayList<Facility>();
        Connection conn = null;
        try {
            conn = DBUtil.getConnection(DBType.MYSQLDB);
            Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            ResultSet rs = stmt.executeQuery("select * from Facilities");
            while(rs.next()) {
                Facility f = new Facility();
                f.id = rs.getInt("Id");
                f.name= rs.getString("Name");
                f.address = rs.getString("Address");
                f.courtTypes = rs.getString("CourtTypes");
                f.courts = rs.getInt("Courts");
                f.city = rs.getString("City");
                f.country = rs.getString("Country");
                f.description = rs.getString("Description");
                f.phone = rs.getString("Phone");
                f.zipcode = rs.getString("Zipcode");
                f.lights = rs.getBoolean("Lights");
                f.latitude = rs.getFloat("Latitude");
                f.longitude = rs.getFloat("Longitude");
                facilitiesList.add(f);
            }
            System.out.println("Total No. of Rows  :" + facilitiesList.size());
        } catch (SQLException e) {
            DBUtil.showErrorMessage(e);
        }
        finally{
            conn.close();
        }

        return facilitiesList;
    }


        public static ArrayList<Facility> getFacilitiesByCriteria(String criteria) throws SQLException {
            ArrayList<Facility> filtered = new ArrayList<Facility>();
            try {

                ArrayList<Facility> facilities = getFacilities();
                if(criteria == null || criteria.isEmpty()) {
                    return facilities;
                }
                 else {
//                List<Facility> filtList = facilities.stream().
//                        filter(value -> value.//convert to uppercase for checking
//                                contains("BLACK")).//filter values containing black
//                        collect(Collectors.toList());//collect as list
//
//                ArrayList<Facility> filter = facilities.stream()
//                        .filter(x -> x..matches("(?i).*Flushing.*"))
//                        .collect(Collectors.toList());
                    //.collect(Collectors.toList(p->p.getValue()));
                    Map<Integer, List<String>> facilitiesMap = new HashMap<Integer, List<String>>();
                    facilities.forEach((facility) -> {
                        facilitiesMap.put(facility.id, Arrays.asList(
                                facility.name,
                                facility.address,
                                facility.courtTypes,
                                String.valueOf(facility.courts),
                                facility.city,
                                facility.country,
                                facility.description,
                                facility.phone,
                                facility.zipcode,
                                String.valueOf(facility.lights),
                                String.valueOf(facility.latitude),
                                String.valueOf(facility.longitude)));
                    });

                    Map<Integer, List<String>> filteredMap = facilitiesMap.entrySet().stream()
                            .filter(x -> x.getValue().contains(criteria))
                            .collect(Collectors.toMap(y -> y.getKey(), y -> y.getValue()));
                    filteredMap.forEach((key, value) -> {
                        Facility f = new Facility();
                        f.id = key;
                        f.name = value.get(0);
                        f.address = value.get(1);
                        f.courtTypes = value.get(2);
                        f.courts = Integer.valueOf(value.get(3));
                        f.city = value.get(4);
                        f.country = value.get(5);
                        f.description = value.get(6);
                        f.phone = value.get(7);
                        f.zipcode = value.get(8);
                        f.lights = Boolean.valueOf(value.get(9));
                        f.latitude = Float.valueOf(value.get(10));
                        f.longitude = Float.valueOf(value.get(11));
                        filtered.add(f);
                    });
                }

            } catch (SQLException e) {
                DBUtil.showErrorMessage(e);
            }
            finally{
                System.out.println("Total No. of Rows  :" + filtered.size());
            }

            return filtered;
        }

}
