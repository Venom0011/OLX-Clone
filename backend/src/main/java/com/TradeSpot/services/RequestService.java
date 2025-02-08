package com.TradeSpot.services;

import com.TradeSpot.DTO.RequestDTO;
import com.TradeSpot.DTO.RequestResponseDTO;
import com.TradeSpot.DTO.UserRespDTO;
import com.TradeSpot.customException.CustomException;
import com.TradeSpot.entities.Request;
import com.TradeSpot.entities.RequestStatus;
import com.TradeSpot.repositories.RequestRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository repository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private  ProductService productService;

    @Autowired
    private  UserService userService;


    public void addRequest(RequestDTO requestDTO){
        Request request=mapper.map(requestDTO,Request.class);
        request.setStatus(RequestStatus.PENDING);
        repository.save(request);
    }

    @Transactional
   // @CacheEvict(value = "allProducts", key = "requestId")
    public void changeStatusToApprove(Long requestId) {
        Request request=repository.findById(requestId).orElseThrow(()->new CustomException("request not found"));
        request.setStatus(RequestStatus.APPROVED);
        productService.buyProduct(request.getBuyerId(),request.getProductId());
        repository.save(request);
    }

    public void changeStatusToDeny(Long requestId) {
        Request request=repository.findById(requestId).orElseThrow(()->new CustomException("request not found"));
        request.setStatus(RequestStatus.DENIED);
        repository.save(request);
    }

    @Transactional
    public List<UserRespDTO> getAllRequest(Long sellerId) {
        List<UserRespDTO> userRespDTOS=new ArrayList<>();
        List<Long> buyers= repository.getBuyersId(sellerId);
       for (Long buyerId : buyers){
           userRespDTOS.add(userService.findUser(buyerId));
       }
        return userRespDTOS;
    }


    public List<RequestResponseDTO> getProductRequest(Long sellerId, Long productId) {
        List<RequestResponseDTO> userRespDTOS=new ArrayList<>();

        List<Request> buyers= repository.getRequestOfProduct(sellerId,productId);

        for (Request request : buyers){
            UserRespDTO userRespDTO = userService.findUser(request.getBuyerId());
            RequestResponseDTO requestResp = mapper.map(userRespDTO, RequestResponseDTO.class);
            requestResp.setRequestId(request.getId());
            requestResp.setStatus(request.getStatus());
            userRespDTOS.add(requestResp);
         }
        return userRespDTOS;
    }



}