import { Component, OnInit } from '@angular/core';
import { Book } from '../models/books';
import { BooksService } from './books.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  isLoading = false;
  books: Book[] = [];
  p: number = 1;

  constructor(
    private bookService: BooksService,
    private toast: HotToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.fetchAll();
  }
  fetchAll() {
    this.bookService.getBooks().subscribe((book) => {
      this.books = book;
      this.spinner.hide();
    });
  }

  delBook(id: string) {
    const successTemplate = 'Xóa Thành Công !';
    const errorTemplate = 'Không thể xóa, đã xảy ra lỗi !';
    this.bookService
      .deleteBook(id)
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: successTemplate,
          error: errorTemplate,
        })
      )
      .subscribe(() => {
        this.books = this.books.filter((book) => book._id !== id);
      });
  }
}
