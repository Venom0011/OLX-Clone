package com.TradeSpot.repositories;

import com.TradeSpot.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request,Long> {

   @Query("Select r.buyerId from Request r where r.sellerId= :sellerId")
    List<Long> getBuyersId(@Param("sellerId") Long sellerId);

    @Query("Select r from Request r where r.sellerId= :sellerId and r.productId= :productId")

    List<Request> getRequestOfProduct(Long sellerId,  Long productId);


}
