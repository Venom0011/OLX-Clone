package com.TradeSpot.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BroughtItems extends  BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY , optional = false)
    @JoinColumn(name = "buyer_id")
    private User  buyer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

}
