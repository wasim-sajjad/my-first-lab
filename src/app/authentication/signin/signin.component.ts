import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Logger } from './logger.model';

import { AuthService } from '../Authentication.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private auth: AuthService,
  private formbuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formbuilder.group(new Logger().validationRules());
    console.log("signin form", this.formGroup);
  }
  onSignin(form){
    this.auth.signin(form).subscribe(
      res=>{
        this.router.navigate(['/books']);
        console.log('logger data:', form);
      },
      error=>{
        console.log(' error occured:', error);
      }
    )
  console.log('these are the values',form)

    
  }
}
