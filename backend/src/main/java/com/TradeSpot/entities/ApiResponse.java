package com.TradeSpot.entities;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ApiResponse {


    private String message;

    private LocalDate date;



    public ApiResponse(String message) {

        this.message = message;

        this.date=LocalDate.now();
    }
}
