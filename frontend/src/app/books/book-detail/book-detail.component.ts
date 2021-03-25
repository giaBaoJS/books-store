import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/books';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Author } from '../../models/author';
import { AuthorsService } from '../../authors/authors.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  clicked = false;
  id: string;
  book: Book;
  author: Author;
  constructor(
    private bookService: BooksService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private authorService: AuthorsService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.spinner.show();
    this.fetchBookDetail();
  }

  fetchBookDetail() {
    this.bookService.getBookDetail(this.id).subscribe((value) => {
      this.book = value;
      this.spinner.hide();
      this.authorService
        .getAuthorDetail(this.book.authorId)
        .subscribe((author) => (this.author = author));
    });
  }
  goBack(): void {
    this.location.back();
  }
  likeBook(bookId: string) {
    this.clicked = true;
    this.bookService.likeBook(bookId).subscribe();
  }
}
