package com.TradeSpot.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserUpdateDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String address;
}
