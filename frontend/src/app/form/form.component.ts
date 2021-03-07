import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books/books.service';
import { Book } from '../models/books';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isUpdate = false;
  id;
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    image: new FormControl(''),
  });
  constructor(
    private bookService: BooksService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.isUpdate = this.id > 0;
  }

  ngOnInit(): void {
    this.getBookDetail();
  }

  getBookDetail() {
    this.bookService.getBookDetail(this.id).subscribe((value) => {
      this.bookForm.patchValue(value);
    });
  }
  onSubmit(bookForm) {
    if (this.isUpdate) {
      this.bookService.updateBook(this.id,bookForm).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    } else {
      this.bookService.addBook(bookForm).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    }
  }
}
