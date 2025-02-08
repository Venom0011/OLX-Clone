package com.TradeSpot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Category")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class Category extends BaseEntity{

    @Column(name = "categoryName")
    private String name;

    @Column(name = "imageData")
    @Lob
    private byte[] imageData;

    @JsonIgnore
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    List<Product> products=new ArrayList<>();

}
