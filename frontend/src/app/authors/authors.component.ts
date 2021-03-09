import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books/books.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  constructor(
    private bookService: BooksService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  authors = null;
  ngOnInit(): void {
    this.spinner.show();
    this.fetchAuthors();
  }
  fetchAuthors() {
    this.bookService.getBooks().subscribe((author) => {
      (this.authors = author), this.spinner.hide();
    });
  }
  fetchDataByName(nameAuthor: string) {
    this.router.navigate(['/books'], { queryParams: { author: nameAuthor } });
  }
}
