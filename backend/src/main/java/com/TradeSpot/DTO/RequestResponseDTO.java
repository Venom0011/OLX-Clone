package com.TradeSpot.DTO;

import com.TradeSpot.entities.RequestStatus;
import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestResponseDTO {


    private long requestId;
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    private String address;
    private RequestStatus status;

}
