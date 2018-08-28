import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import { MatCardModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';

//import { UserComponent } from './user/user.component';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';
import { BookService } from './book/book.service';
import { AddBookComponent } from './book/add-book/add-book.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SigninComponent } from './authentication/signin/signin.component';
//import {HttpModule} from '@angular/http';
import { AuthService } from './authentication/Authentication.Service';
//import { AuthGuard } from './auth/authGuard.service';
import { Book } from './book/book.model';
//import { AddBookComponent} from './book/add-book/add-book.component';




const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      
      
        {path: 'books',
        component: BookComponent},
        
          
          {
            path: 'add-book',
      component: AddBookComponent,
      // canActivate: [AuthGuard]
    }, 
      
     
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'signin',
        component: SigninComponent,
      }
     
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HeaderComponent,
    AddBookComponent,
    LayoutComponent,
    RegisterComponent,
    SigninComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BookService,AuthService],
  entryComponents: [AddBookComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
