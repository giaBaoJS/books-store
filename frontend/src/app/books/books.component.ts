import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Book } from '../models/books';
import { BooksService } from './books.service';
import { AuthorsService } from '../authors/authors.service';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author';
// import SwiperCore, { Pagination, Scrollbar, A11y } from 'swiper/core';
// SwiperCore.use([Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit, AfterViewInit {
  user;
  isAdmin = false;
  isLoading = false;
  books: Book[] = [];
  booksHot: Book[] = [];
  booksNew: Book[] = [];
  p: number = 1;
  authors: Author[] = [];
  mySwiper: Swiper;
  constructor(
    private bookService: BooksService,
    private toast: HotToastService,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private authorService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profile'));
    if (this.user?.result.role === 'admin') {
      this.isAdmin = true;
    }
    this.fetchAll();
    this.fetchAllAuthor();
    this.spinner.show();
  }
  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      observer: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      spaceBetween: 30,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1040: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
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
  filterItemsOfType() {
    return this.books.filter((val) => val.like > 10);
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

  // onSwiper(swiper) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }
}
