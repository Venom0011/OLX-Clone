import { UserDTO } from './../../../models/userDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserUpdateDTO } from 'src/app/models/userUpdateDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userId: number;
  user: UserDTO;
  userUpdateDTO: UserUpdateDTO = {
    firstName: '',
    lastName: '',
    email: '',
    address: ''
  };
  responseMessage: string;
  updateUserForm: FormGroup;

  constructor(private fb:FormBuilder,private userService: UserService) { 
    this.createForm();

    this.userId = JSON.parse(sessionStorage.getItem("user")).id;
  }


  createForm() {
    this.updateUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  updateUser() {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.userUpdateDTO).subscribe(
        response => {
          this.responseMessage = response.message;
        },
        error => {
          console.error('Update failed', error);
          this.responseMessage = 'Update failed';
        }
      );
    } else {
      this.responseMessage = 'Invalid user ID';
    }
  }

  ngOnInit(): void{
    this.loadUserData();

  }

  get formControls() {
    return this.updateUserForm.controls;
  }

  loadUserData(): void{
    this.userService.getUserById(this.userId).subscribe(
      {
        next: user => {
        this.updateUserForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address
        });
      },
      error: (error) => {
        console.error('Error fetching user details', error);
        this.responseMessage = 'Error fetching user details';
      }
  });
  }

}
