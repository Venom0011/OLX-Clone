
package com.TradeSpot.controllers;



import com.TradeSpot.DTO.*;

import com.TradeSpot.entities.ApiResponse;

import com.TradeSpot.entities.User;

import com.TradeSpot.services.JwtService;
import com.TradeSpot.services.UserService;


import com.TradeSpot.services.jwt.UserJwtImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserService userservice;

    @Autowired
    private UserJwtImpl userJwt;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping(path = "/signup", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ApiResponse> saveUser(@RequestBody UserDTO userDTO){
        User user=userservice.addUser(userDTO);

        if(user!= null){
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("User added successfully"));
        }
        else{
            return ResponseEntity.status(500).body(new ApiResponse("Unsuccessfull: User not added"));
        }
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<UserDTO> users= userservice.listOfAllUsers();

        if(users!= null){
            return ResponseEntity.ok(users);
        }
        else{
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping(path ="/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getByIdUser(@PathVariable Long id){
        UserRespDTO user= userservice.findUser(id);

        if(user!= null){
            return ResponseEntity.ok(user);
        }
        else{
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){

        userservice.deleteUser(id);
        return ResponseEntity.ok().build();

    }

    @GetMapping("/byname/{name}")
    public List<User> getByName(@PathVariable String name){
        return userservice.findByName(name);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
    try{
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),loginDTO.getPassword())
        );
    }catch (AuthenticationException e){
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    UserDetails user;
    try{
       user=userJwt.loadUserByUsername(loginDTO.getEmail());
    }catch (UsernameNotFoundException e){
        return ResponseEntity.status(404).build();
    }
        System.out.println(user.getAuthorities());
    String jwt=jwtService.generateToken(user);

    return ResponseEntity.ok(new LoginResponse(jwt));
    }

    @PostMapping("/getByToken")
    public ResponseEntity<?> getUserByToken(@RequestBody LoginResponse response){
        try{
           String email= jwtService.extractUsername(response.getJwtToken());
           UserRespDTO dto=userservice.findByEmail(email);

           if(dto!=null){
               return  ResponseEntity.ok(dto);
           }
           else {
               return ResponseEntity.status(404).body(new ApiResponse("Email not found"));
           }
        }catch (Exception e){
            return  ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateDTO userupdate, @PathVariable long userId){

        User user = userservice.updateUser(userId, userupdate);
        if(user != null){
            return ResponseEntity.ok().body(new ApiResponse("User updated successfully with id  "+ userId));

        }
        else{
            return ResponseEntity.status(500).body(new ApiResponse("Unsuccessful: not updated with id "+userId));
        }

    }





    @GetMapping("/getBuyerCount")
    public ResponseEntity<?> getBuyerCount(){

        return  ResponseEntity.ok(userservice.findBuyerCount());
    }



    @GetMapping("/recentUser")
    public ResponseEntity<?> getRecentUser(){
        return  ResponseEntity.ok(userservice.getRecentUsers());
    }

    @GetMapping("/forgotPassword/{email}")
    public  ResponseEntity<?> forgotPassword(@PathVariable String email){

        String msg = userservice.forgotPassword(email);

        return  ResponseEntity.ok(msg);
    }

}
