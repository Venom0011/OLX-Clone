
package com.TradeSpot.DTO;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Getter
@Setter
public class UserDTO {

    private String firstName;
    private String lastName;
    private String email;
    @JsonProperty( access=JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String address;
//    private String role;



}
