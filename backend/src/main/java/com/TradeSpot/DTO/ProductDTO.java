package com.TradeSpot.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@NoArgsConstructor

@Getter
@Setter
public class ProductDTO {

    private String productName;

    private String description;

    private double price;

    private LocalDate addedDate;
    private String productAddress;
    private String city;




}
