import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormBuilder, FormGroup } from '@angular/forms';

import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  loaded = false;

  public fg: FormGroup;

  constructor(private bookservice: BookService,
    public dialogRef: MatDialogRef<AddBookComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log('asdfad');
    this.fg = this.fb.group(new Book().validationRules());

    if (!this.data.isNew) {
      this.findBook(this.data.id);
    }
  }

  findBook(id) {
    this.bookservice.findOne(id).subscribe(res => {
      console.log('findOne: ', res);
      this.fg.patchValue(res);
    });
  }


  saveData(form) {
    if (this.data.isNew) {
      this.createBook(form);
    } else {
      this.updateBook(form, this.data.id);
    }

  }

  createBook(book: Book) {
    this.bookservice.create(book).subscribe(response => {
      console.log('working', response);
      this.dialogRef.close(true);

    }, error => {
      console.log('error occured', error);
      this.dialogRef.close(false);
    }
    );
  }

  updateBook(book: Book, id) {
    this.bookservice.update(book, id).subscribe(response => {
      console.log('working', response);
      this.dialogRef.close(true);

    }, error => {
      console.log('error occured', error);
      this.dialogRef.close(false);
    }
    );
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
