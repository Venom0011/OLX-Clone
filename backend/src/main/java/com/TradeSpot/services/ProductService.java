package com.TradeSpot.services;

import com.TradeSpot.DTO.*;
import com.TradeSpot.customException.CustomException;
import com.TradeSpot.entities.Category;
import com.TradeSpot.entities.Product;
import com.TradeSpot.entities.User;
import com.TradeSpot.repositories.ProductRepository;
import com.TradeSpot.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.System.out;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Imageservice imageservice;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender javaMailSender;




    @Autowired
    private BroughtItemService broughtItemsServices;

    @Transactional
    @CacheEvict(cacheNames = "allProducts",allEntries = true)

    public Product saveProduct(ProductDTO productDTO, String categoryName, Long userId, MultipartFile file) throws IOException {

        Category category= categoryService.findByName(categoryName);
        User user = userRepository.findById(userId).orElseThrow();
        Product product=mapper.map(productDTO, Product.class);
        product.setCategory(category);
        product.setUser(user);
        product.setActive(true);
        product.setImageData(file.getBytes());
        Product save = productRepository.save(product);
        return product;
    }

    @Cacheable(cacheNames = "allProducts")
    public PaginationDTO getALlProducts(int pageNumber) {

        Pageable p = PageRequest.of(pageNumber-1,10 );
        PaginationDTO response = new PaginationDTO();

        Page<Product> products = productRepository.findAll(p);
        List<Product> productList = products.getContent();

        List<ProductResponseDTO> list = productList.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).toList();
        response.setPrductList(list);
        response.setTotalProducts(products.getTotalElements());
        response.setLast(products.isLast());
        response.setPageSize(products.getSize());
        response.setPageNumber(products.getNumber()+1);
        response.setTotalPages(products.getTotalPages());

        return  response;

    }

    public ProductResponseDTO getProductById(long productId) throws CustomException {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException("Product not found with id : "+ productId));

        return mapper.map(product, ProductResponseDTO.class);

    }

   @CacheEvict(cacheNames = "allProducts", key = "#productId", allEntries = true)
    public String deleteProduct(long productId) throws CustomException {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new CustomException("Product not found with id : "+ productId));




        productRepository.deleteById(productId);
        return "Product deleted successfully";


    }

    @Transactional
   @CacheEvict(cacheNames = "allProducts",allEntries = true)
    public void buyProduct(long userid, long productid) {

        User user=userRepository.findById(userid).orElseThrow();
        Product product=productRepository.findById(productid).orElseThrow();
        product.setActive(false);
        product=productRepository.save(product);


        broughtItemsServices.buyProduct(user,product);





    }

    public List<ProductResponseDTO> userSoldProducts(long userId){

        List<Product> productList = productRepository.userSoldProducts(userId);
        return  productList.stream().map(product -> mapper.map(product,ProductResponseDTO.class)).collect(Collectors.toList());
    }

    @CachePut(cacheNames = "allProducts", key = "#productId")
    public Product updateProduct(long productId, ProductDTO productDTO, MultipartFile file) throws IOException {

        Product product = productRepository.findById(productId).orElseThrow(() -> new CustomException("Product not found with id " + productId));
        product.setActive(true);
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setAddedDate(productDTO.getAddedDate());
        product.setPrice(productDTO.getPrice());
        product.setImageData(file.getBytes());

        return productRepository.save(product);

    }

    @Cacheable(cacheNames = "allProducts")
    public PaginationDTO findProductsByCategoryName(String categoryName, int pageNumber) {

        PaginationDTO response= new PaginationDTO();
        Pageable p = PageRequest.of(pageNumber-1, 10);

        Page<Product> pageList = productRepository.getProductByCategoryName(p,categoryName);
        response.setTotalProducts(pageList.getTotalElements());
        response.setPrductList(pageList.getContent().stream().map(product -> mapper.map(product, ProductResponseDTO.class)).toList());
        response.setLast(pageList.isLast());
        response.setPageSize(pageList.getSize());
        response.setPageNumber(pageList.getNumber());
        response.setTotalPages(pageList.getTotalPages());





        return response;
    }

    public List<ProductResponseDTO> getBuyItems(long userId){
        List<Product> products= broughtItemsServices.productList(userId);


        return products.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).toList();

    }

    @Transactional
    public List<ProductResponseDTO> getListedProduct(long userId) {

        List<Product> list = userService.listUserProducts(userId);

        return list.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).collect(Collectors.toList());
    }


    @Cacheable(cacheNames = "allProducts")
    public PaginationDTO findActiveProducts(int pagenumber){

        Pageable p = PageRequest.of(pagenumber-1, 10);
        Page<Product> productList = productRepository.findActiveProducts(p);
        List<ProductResponseDTO> list =productList.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).collect(Collectors.toList());
        PaginationDTO response = new PaginationDTO();
        response.setPrductList(list);
        response.setTotalProducts(productList.getTotalElements());
        response.setLast(productList.isLast());
        response.setPageSize(productList.getSize());
        response.setPageNumber(productList.getNumber()+1);
        response.setTotalPages(productList.getTotalPages());
        out.println("hii all");

        return response;

    }

    public List<ProductResponseDTO> findOtherUsersProducts(long userId) {

        List<Product> list = productRepository.listOthersProducts( userId);

        return list.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).collect(Collectors.toList());
    }

    @Transactional
    public List<ProductResponseDTO> findActiveProductsByUserId(long userId) {

        List<Product> list= productRepository.listUserActiveProducts(userId);


        return list.stream().map(product -> mapper.map(product, ProductResponseDTO.class)).collect(Collectors.toList());
    }

    public long getSellerCount() {

        return productRepository.getSellerCount();
    }

    @Transactional
    public UserDTO findSeller(long productId) {

        Product product = productRepository.findById(productId).orElseThrow();
        return mapper.map(product.getUser(), UserDTO.class);
    }


    @Transactional
    public String sendNotification(Long userId, long productId) {




        try {


            Product product = productRepository.findById(productId).orElseThrow();
            UserRespDTO user = userService.findUser(userId);
            UserUpdateDTO userUpdateDTO = mapper.map(user, UserUpdateDTO.class);

            String str = buildEmailBody(product.getUser().getFirstName()+" "+product.getUser().getLastName(),product.getProductName(),product.getDescription(),
                    user.getFirstName()+" "+ user.getLastName(),user.getEmail(),user.getAddress());
            SimpleMailMessage message = new SimpleMailMessage();
            System.out.println(product.getUser().getEmail());
            message.setTo(product.getUser().getEmail());
            message.setSubject("buyer notification");
            System.out.println(userUpdateDTO.toString());
            message.setText(str);
            javaMailSender.send(message);
            return "mail sent successfully";

        }catch (MailException e){
            e.printStackTrace();
        }
        return "mail sent successfully";
    }

    public static String buildEmailBody(String sellerName, String productName,  String productDescription, String buyerName, String buyerEmail, String buyerLocation) {
        return String.format(
                "Dear %s,%n%n" +
                        "I hope this message finds you well.%n%n" +
                        "We are excited to inform you that a buyer has shown interest in your product. Below are the details of the buyer and the product they are interested in:%n%n" +
                        "Product Information:%n" +
                        "- Product Name: %s%n" +

                        "- Description: %s%n%n" +
                        "Buyer Information:%n" +
                        "- Name: %s%n" +
                        "- Email: %s%n" +
                        "- Location: %s%n%n" +
                        "We encourage you to review these details and reach out to the buyer to discuss further steps. If you have any questions or need assistance, please do not hesitate to contact us.%n%n" +
                        "Thank you for your attention, and best of luck with your sale!%n%n" +
                        "Warm regards,%n" +
                        "OLX",

                sellerName,
                productName,

                productDescription,
                buyerName,
                buyerEmail,
                buyerLocation
        );
    }

    public ProductRequestDTO getProductDetailsByProductId(long productId) {

        Product product = productRepository.findById(productId).orElseThrow();

        ProductRequestDTO productRequestDto = mapper.map(product, ProductRequestDTO.class);
        productRequestDto.setSellerId(product.getUser().getId());

        return  productRequestDto;
    }

    @Cacheable(value = "allProducts")
    public PaginationDTO sortProducts(int pageNumber, String sortBy) {

        Page<Product> list;
        if(sortBy.equals("addedDate")){
            Pageable p = PageRequest.of(pageNumber-1, 5, Sort.by(Sort.Direction.DESC, sortBy) );
            list = productRepository.findAll(p);

        }
        else{
            Pageable p = PageRequest.of(pageNumber-1, 5, Sort.by(sortBy) );
             list = productRepository.findAll(p);
        }

        List<ProductResponseDTO> response = list.getContent()
                                                .stream()
                                                 .map(product -> mapper.map(product, ProductResponseDTO.class))
                                                    .toList();


        PaginationDTO result = new PaginationDTO();
        result.setPrductList(response);
        result.setTotalProducts(list.getTotalElements());
        result.setLast(list.isLast());
        result.setPageSize(list.getSize());
        result.setPageNumber(list.getNumber());
        result.setTotalPages(list.getTotalPages());
        return  result;
    }
}
