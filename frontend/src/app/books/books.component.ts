import { Component, OnInit } from '@angular/core';
import { Book } from '../models/books';
import { BooksService } from './books.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BooksService,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
  }
  fetchAll() {
    this.bookService.getBooks().subscribe((book) => (this.books = book) );

  }

  delBook(id) {
    const successTemplate = "Xóa Thành Công !"
    const errorTemplate = "Không thể xóa, đã xảy ra lỗi !"
    this.bookService.deleteBook(id).pipe(this.toast.observe(
      {
        loading: 'Saving...',
        success: successTemplate,
        error: errorTemplate,
      }
    )).subscribe(() => {
      this.books = this.books.filter((book) => book.id !== id);
    });
  }
}
