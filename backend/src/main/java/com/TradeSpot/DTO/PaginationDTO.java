package com.TradeSpot.DTO;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PaginationDTO {


    private List<ProductResponseDTO> prductList;
    private  long pageSize;
    private  int pageNumber;
    private  long totalProducts;
    private  boolean isLast;
    private long totalPages;
}
