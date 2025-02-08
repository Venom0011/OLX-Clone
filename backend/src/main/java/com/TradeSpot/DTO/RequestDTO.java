package com.TradeSpot.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestDTO {


    private Long sellerId;

    private Long buyerId;

    private Long productId;
}
