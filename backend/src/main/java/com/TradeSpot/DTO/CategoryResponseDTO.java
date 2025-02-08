package com.TradeSpot.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CategoryResponseDTO {

    private long id;
    private String name;
    private byte[] imageData;

}
