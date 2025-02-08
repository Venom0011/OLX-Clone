package com.TradeSpot.DTO;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductResponseDTO {

    private long id;
    private String productName;
    private String description;
    private double price;
    private LocalDate addedDate;
    private boolean isActive;
    private  byte[] imageData;
    private String productAddress;
    private String city;
}
