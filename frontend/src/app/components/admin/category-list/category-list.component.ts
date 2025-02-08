import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  categories: Category[];
  constructor(private categoryService: CategoryService,private dialogRef:MatDialog) {}
  
  ngOnInit(): void {
    this.loadCategories();
  }

  openModal() {
    this.dialogRef.open(NewCategoryComponent);
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (category) => {
        this.categories = category;
      }
    });
  }
}
