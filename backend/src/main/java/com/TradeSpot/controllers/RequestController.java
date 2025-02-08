package com.TradeSpot.controllers;

import com.TradeSpot.DTO.RequestDTO;
import com.TradeSpot.DTO.RequestResponseDTO;
import com.TradeSpot.DTO.UserRespDTO;
import com.TradeSpot.entities.ApiResponse;
import com.TradeSpot.services.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
public class RequestController {


    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<?> addRequestForProduct(@RequestBody RequestDTO requestDTO){
        requestService.addRequest(requestDTO);
        return ResponseEntity.ok(new ApiResponse("Request Send "));
    }


    @PostMapping("/approve/{requestId}")
    public ResponseEntity<?> changeStatusToApprove(@PathVariable Long requestId){
        requestService.changeStatusToApprove(requestId);
        return ResponseEntity.ok(new ApiResponse("Status updated"));
    }

    @PostMapping("/deny/{requestId}")
    public ResponseEntity<?> changeStatusToDeny(@PathVariable Long requestId){
        requestService.changeStatusToDeny(requestId);
        return ResponseEntity.ok(new ApiResponse("Status updated"));
    }

    @GetMapping("/getAllRequestOfSeller/{sellerId}")
    public ResponseEntity<List<UserRespDTO>> getAllRequestOfSeller(@PathVariable Long sellerId){
       return ResponseEntity.ok(requestService.getAllRequest(sellerId));
    }

    @GetMapping("/getProductRequest/{sellerId}/{productId}")
    public ResponseEntity<List<RequestResponseDTO>> getProductRequest(@PathVariable Long sellerId, @PathVariable Long productId){
        return ResponseEntity.ok(requestService.getProductRequest(sellerId,productId));
    }







}
