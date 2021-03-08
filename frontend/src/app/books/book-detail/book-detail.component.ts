import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/books';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  id: string;
  book: Book;
  constructor(
    private bookService: BooksService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService

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
    });
  }
  goBack(): void {
    this.location.back();
  }
}
