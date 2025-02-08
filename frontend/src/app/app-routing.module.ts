import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/registration/login/login.component';
import { ForgotPasswordComponent } from './components/registration/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/registration/register/register.component';
import { CategoriesComponent } from './components/landing-page/categories/categories.component';
import { AboutusComponent } from './components/layout/footer/aboutus/aboutus.component';
import { FaqComponent } from './components/layout/footer/faq/faq.component';
import { FeaturesComponent } from './components/layout/footer/features/features.component';
import { ContactComponent } from './components/layout/footer/contact/contact.component';
import { ProductsContainerComponent } from './components/product/products-container/products-container.component';
import { NewProductComponent } from './components/product/new-product/new-product.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { NewCategoryComponent } from './components/admin/new-category/new-category.component';
import { CategoryListComponent } from './components/admin/category-list/category-list.component';
import { AuthGuard } from './components/auth/auth.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { UserListingsComponent } from './components/product/my-listings/user-listings/user-listings.component';
import { UpdateProductDetailsComponent } from './components/product/my-listings/update-product-details/update-product-details.component';
import { UpdateUserComponent } from './components/registration/update-user/update-user.component';
import { ForbiddenComponent } from './components/layout/forbidden/forbidden.component';
import { ProductRequestsComponent } from './components/product/my-listings/user-listings/product-requests/product-requests.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent,data:{roles:['USER']} },
  { path: 'categories', component: CategoriesComponent,data:{roles:['USER']} },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'features', component: FeaturesComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data:{roles:['ADMIN']}
  },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsContainerComponent,data:{roles:['USER']} },
  {
    path: 'addProduct',
    component: NewProductComponent,
    canActivate: [AuthGuard],
    data:{roles:['USER']}
  },
  {
    path: 'admin-product',
    component: AdminProductComponent,
    canActivate: [AuthGuard],
    data:{roles:['ADMIN']}
  },
  { path: 'productRequests/:id',
    component: ProductRequestsComponent,
    canActivate: [AuthGuard],
    data:{roles:['USER']}
   },
  {
    path: 'adminCategory',
    component: CategoryListComponent,
    canActivate: [AuthGuard],
    data:{roles:['ADMIN']}
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },

  { path: 'userListings', component: UserListingsComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent ,
    canActivate: [AuthGuard],
    data:{roles:['USER']}
  },
  {
    path: 'updateProductDetails/:id',
    component: UpdateProductDetailsComponent,
  },
  { path: '**', component: CategoriesComponent },
  { path: 'updateUser', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
