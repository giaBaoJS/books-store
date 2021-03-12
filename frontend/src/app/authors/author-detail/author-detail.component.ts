import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { BooksService } from '../../books/books.service';
import { Book } from '../../models/books';
import { Author } from 'src/app/models/author';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss'],
})
export class AuthorDetailComponent implements OnInit {
  id: string;
  books: Book[] = [];
  author: Author;
  constructor(
    private authorService: AuthorsService,
    private bookService: BooksService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
  }
  ngOnInit() {
    this.getAuthorDetail()
    this.getBookByAuthor();
  }

  getAuthorDetail() {
    this.authorService.getAuthorDetail(this.id).subscribe((value) => {
      this.author = value;
    });
  }
  getBookByAuthor() {
    this.bookService
      .getBookByAuthor(this.id)
      .subscribe((book) => (this.books = book));
  }
}
