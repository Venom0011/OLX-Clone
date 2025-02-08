package com.TradeSpot.services;

import com.TradeSpot.entities.BroughtItems;
import com.TradeSpot.entities.Product;
import com.TradeSpot.entities.User;
import com.TradeSpot.repositories.BroughtItemsRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BroughtItemService {

    @Autowired
    private BroughtItemsRepo broughtItemsRepo;

    @Autowired
    private ModelMapper mapper;

    public BroughtItems buyProduct(User user, Product product){
        BroughtItems broughtItems=new BroughtItems(user,product);
        System.out.println(product);
        return broughtItemsRepo.save(broughtItems);
    }



    public List<Product> productList(long id){

        return broughtItemsRepo.findProductsByBuyerId(id);
    }
}
