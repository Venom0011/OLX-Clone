package com.TradeSpot.controllers;

import com.TradeSpot.DTO.*;
import com.TradeSpot.customException.CustomException;
import com.TradeSpot.entities.ApiResponse;
import com.TradeSpot.entities.Product;
import com.TradeSpot.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path= "/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> listAllProduct( @RequestParam( defaultValue = "1") int pageNumber) throws CustomException {

        PaginationDTO paginationDTO= productService.getALlProducts(pageNumber);
        if(paginationDTO!=null){
            return ResponseEntity.ok(paginationDTO);
        }
        else{
            throw new CustomException("list is empty");

        }
    }

    @GetMapping(path = "/{productId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> findProductById(@PathVariable long productId) throws CustomException {

        ProductResponseDTO productDTO= productService.getProductById(productId);
        if(productDTO!=null){
            return ResponseEntity.ok(productDTO);
        }
        else{
            return ResponseEntity.notFound().build();

        }
    }

    @PostMapping(path = "buyproduct/{userid}/{productid}")
    public void buyProduct(@PathVariable long userid, @PathVariable long productid){

        productService.buyProduct(userid, productid);

    }

    @DeleteMapping (path = "/{productId}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable long productId) throws CustomException {

        String message = productService.deleteProduct(productId);
        return ResponseEntity.ok().body(new ApiResponse(message));

    }


    @GetMapping("/getUserSoldProducts/{userId}")
    public ResponseEntity<?> getSoldProductList(@PathVariable long userId){
        List<ProductResponseDTO> list = productService.userSoldProducts(userId);

        if(!list.isEmpty()){
            return ResponseEntity.ok().body(list);
        }
        else{
            System.out.println("in empty mail");
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }

    }
    @PutMapping(path = "/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@PathVariable long productId,
                                           @ModelAttribute ProductDTO productDTO,
                                           @RequestPart MultipartFile file) throws IOException {

        Product product= productService.updateProduct(productId, productDTO, file);

        if(product != null){
            return ResponseEntity.ok().body(new ApiResponse("Product updated successfully with id  "+ productId));

        }
        else{
            return ResponseEntity.status(500).body(new ApiResponse("Unsuccessful: not updated with id "+productId));
        }
    }


    @PostMapping(path="/{userId}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> addProduct(
            @PathVariable long userId,
            @ModelAttribute ProductDTO productDTO,
            @RequestParam String categoryName,
            @RequestPart("image") MultipartFile file) throws IOException {


        Product product= productService.saveProduct(productDTO, categoryName, userId, file);
        if(product!=null){
            return ResponseEntity.ok().body(new ApiResponse("product added successfully"));
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: product not added"));
        }



    }

    @GetMapping("/getproductbycategory/{categoryName}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String categoryName,
                                                   @RequestParam(defaultValue = "1") int pageNumber){

        PaginationDTO dtoList=productService.findProductsByCategoryName(categoryName, pageNumber);
        if(dtoList!=null){
            return ResponseEntity.ok().body(dtoList);
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping("/getbuyproduct/{id}")
    public ResponseEntity<?> getBroughtItems(@PathVariable long id){
        List<ProductResponseDTO> list = productService.getBuyItems(id);

        if(list!=null){
            return ResponseEntity.ok().body(list);
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping("/getsellproduct/{id}")
    public ResponseEntity<?> getSellItems(@PathVariable long id){
        List<ProductResponseDTO> list = productService.getListedProduct(id);

        if(list!=null){
            return ResponseEntity.ok().body(list);
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping(path = "/activeproducts")
    public ResponseEntity<?> getActiveProducts(@RequestParam(defaultValue = "1") int pageNumber){
        // List<ProductResponseDTO> list = productService.findActiveProducts();
        PaginationDTO list = productService.findActiveProducts(pageNumber);
        if(list!=null){
            return ResponseEntity.ok().body(list);
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping("/getproducts/{userId}")
    public ResponseEntity<?> otherUserProducts(@PathVariable long userId){

        List<ProductResponseDTO> list = productService.findOtherUsersProducts(userId);

        if(!list.isEmpty()){
            return ResponseEntity.ok().body(list);
        }
        else{
            System.out.println("in empty mail");
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping(path = "/getproductsbyuserId/{userId}")
    public ResponseEntity<?> getActiveProductsByUserId(@PathVariable long userId){

        List<ProductResponseDTO> list = productService.findActiveProductsByUserId(userId);

        if(!list.isEmpty()){
            return ResponseEntity.ok().body(list);
        }
        else{
            System.out.println("in empty mail");
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }

    @GetMapping("/getSellerCount")
    public ResponseEntity<?> getSellerCount(){

        long count = productService.getSellerCount();
        return  ResponseEntity.ok().body(count);
    }


    @GetMapping(path="/getSeller/{productId}")
    public  ResponseEntity<?> getSeller(@PathVariable long productId){

        UserDTO seller = productService.findSeller(productId);

        return ResponseEntity.ok().body(seller);
    }



    @GetMapping("/contactSeller/{userId}/{productId}")
    public ResponseEntity<?> notifySeller(@PathVariable Long userId, @PathVariable Long productId ){

        String msg = productService.sendNotification(userId, productId);

        return  ResponseEntity.ok().body(msg);
    }

    @GetMapping("/getProductDetailsByProductId/{productId}")
    public ResponseEntity<?> getProductDetailsByProductId(@PathVariable long productId){

        ProductRequestDTO productRequestDto = productService.getProductDetailsByProductId(productId);

        if(productRequestDto != null){
            return ResponseEntity.ok().body(productRequestDto);
        }
        else{

            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }


    }

    @GetMapping(path = "/sortProducts")
    public ResponseEntity<?> sortProducts(@RequestParam(defaultValue = "1") int pageNumber,
                                          @RequestParam (defaultValue = "id", required = false) String sortBy){
        // List<ProductResponseDTO> list = productService.findActiveProducts();
        PaginationDTO list = productService.sortProducts(pageNumber, sortBy);
        if(list!=null){
            return ResponseEntity.ok().body(list);
        }
        else{
            return  ResponseEntity.ok().body(new ApiResponse("unsuccessful: products not find"));
        }
    }









}
