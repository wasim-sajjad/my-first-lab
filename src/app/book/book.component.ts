import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AuthService} from '../authentication/Authentication.Service';

import { Book } from './book.model'
import { BookService } from './book.service';

import { AddBookComponent } from './add-book/add-book.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public books: Book[];

  constructor(private bookservice: BookService, private matDialog: MatDialog,
     private authservice: AuthService) { }

  ngOnInit() {
    this.findAllBooks();
  }

  onUpdate(id: number) {
    console.log('idd: ', id);
    const dialogRef = this.matDialog.open(AddBookComponent, {
      width: '500px',
      data: { isNew: false, id: id }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.findAllBooks();
      }
      console.log('closed');
    });

  }

  onDelete(id: number) {
    console.log('idd: ', id);
    this.bookservice.delete(id).subscribe(
      response => {
        this.findAllBooks();
      }, error => {
        console.log("the error has occured", error);
      }
    );
  }

  findAllBooks() {
    this.bookservice.findAll().subscribe(response => {
      this.books = response;
      console.log('this.books: ', this.books);
    }, error => {
      console.log('error: ', error);
    }, () => {

    }
    )

    console.log('working fine', this.books);
    //this.books= this.bookservice.getBooks();
  }


  onClick() {
    const dialogRef = this.matDialog.open(AddBookComponent, {
      width: '500px',
      data: {isNew: true}
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.findAllBooks();
      }
      console.log('closed');
    });

  }

}
