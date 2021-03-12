import { Component, OnInit } from '@angular/core';
import { Book } from '../models/books';
import { BooksService } from './books.service';
import { AuthorsService } from '../authors/authors.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  isLoading = false;
  books: Book[] = [];
  p: number = 1;
  authors: Author[] = [];
  constructor(
    private bookService: BooksService,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private authorService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.fetchAll();
    this.fetchAllAuthor();
    this.spinner.show();
  }
  fetchAllAuthor() {
    this.authorService.getAuthors().subscribe((author) => {
      this.authors = author;
    });
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


  onSwiper(swiper) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
