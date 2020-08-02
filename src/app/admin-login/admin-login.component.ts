import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service/login.service';
import { AdminDataModel } from '../models/admin-data-model.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  invalid: boolean;
  constructor(private fb: FormBuilder, private route: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.invalid = false;
   }

  ngOnInit(): void {

  }

  getErrorMessage() {
    return this.loginForm.get('username').hasError('required') ? 'You must enter a value' :
        this.loginForm.get('password').hasError('required') ? 'You must enter a value' :
            '';
  }

  login(myform: AdminDataModel) {
      if (this.loginService.adminLogin(myform)){
        this.route.navigate(['/home']);
      }
      else{
       this.invalid = true;
      }
      this.loginService.getAdminStatus();
    }

  resetForm() {
    this.loginForm.reset();
  }

}
