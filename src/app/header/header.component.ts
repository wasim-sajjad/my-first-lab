import { Component, OnInit, Output } from '@angular/core';
//import { EventEmitter } from 'protractor';
import { AuthService } from '../authentication/Authentication.Service'
//import {}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }
 onlogout(){
  this.authservice.logout();
 // this.router.navigate(['/signin'])

 }

}
