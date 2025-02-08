
package com.TradeSpot.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserRespDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonProperty( access=JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String address;
    private String role;



}
