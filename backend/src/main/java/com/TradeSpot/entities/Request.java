package com.TradeSpot.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Request extends  BaseEntity {

    @Column(name="seller_id")
    private Long sellerId;
    @Enumerated(EnumType.STRING)
    private  RequestStatus status;
    @Column(name="buyer_id")
    private Long buyerId;
    @Column(name="product_id")
    private Long productId;

}
