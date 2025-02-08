package com.TradeSpot.repositories;

import com.TradeSpot.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category,Long> {


    @Query("SELECT c from Category c where c.name= :name")
    Category findByName(@Param("name") String name);
}
