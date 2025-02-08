package com.TradeSpot.repositories;

import com.TradeSpot.entities.BroughtItems;
import com.TradeSpot.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BroughtItemsRepo extends JpaRepository<BroughtItems, Long> {


    @Query("SELECT bi.product FROM BroughtItems bi WHERE bi.buyer.id = :buyerId")
    List<Product> findProductsByBuyerId(@Param("buyerId") Long buyerId);

    @Query("SELECT COUNT(DISTINCT p.buyer) FROM BroughtItems p")
    long findBuyerCount();
}
