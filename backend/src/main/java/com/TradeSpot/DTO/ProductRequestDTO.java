package com.TradeSpot.DTO;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ProductRequestDTO {


    private long id;
    private String productName;
    private String description;
    private double price;
    private LocalDate addedDate;
    private boolean isActive;
    private String productImgPath;
    private long sellerId;
}
