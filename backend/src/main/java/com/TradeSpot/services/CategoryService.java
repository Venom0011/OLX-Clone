package com.TradeSpot.services;

import com.TradeSpot.DTO.CategoryDTO;
import com.TradeSpot.DTO.CategoryResponseDTO;
import com.TradeSpot.entities.Category;
import com.TradeSpot.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private Imageservice imageservice;

    public Category saveCategory(CategoryDTO categoryDTO, MultipartFile file) throws IOException {
        Category category= Category.builder().name(categoryDTO.getName())
                .imageData(file.getBytes()).build();
        return categoryRepository.save(category);
    }

    public List<CategoryResponseDTO> findAllCategories() {

//         return categoryRepository.findAll();
        List<Category> category= categoryRepository.findAll();

        return   category.stream().map(e->mapper.map(e,CategoryResponseDTO.class)).toList();
    }

    public CategoryResponseDTO findCategory(Long id) {

        Category category= categoryRepository.findById(id).orElseThrow();
        category.setImageData(category.getImageData());
        return mapper.map(category, CategoryResponseDTO.class);
    }

    public String DeleteCategory(long id) {
        Category category= categoryRepository.findById(id).orElseThrow();
        categoryRepository.deleteById(id);
        return "Deleted successfully";


    }

    public Category findByName(String name){
        return categoryRepository.findByName(name);
    }
    }
