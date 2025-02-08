import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent {
  selectedFile: File;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  onSubmit(data): void {
    this.categoryService
      .createCategory(data, this.selectedFile)
      .subscribe((result) => {
        if (result) {
          this.toastr.success("Category Added Successfully");
        }
        this.router.navigateByUrl("/admin");
      });
    console.log(data);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
