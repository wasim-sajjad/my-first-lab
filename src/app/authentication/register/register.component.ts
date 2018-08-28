import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../Authentication.Service';

import { User } from './user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(new User().validationRules());

    console.log('this.formGroup: ', this.formGroup);
  }

  onSignup(form) {
    this.auth.create(form).subscribe(
      response => {
        console.log("the details of user:", form);
        this.router.navigate(['signin']);
      }, error => {
        console.log("the error has occured", error);
      }
    );
    console.log('form: ', form);

    // this.auth.signup(email, password);
  }
}