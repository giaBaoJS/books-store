import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books/books.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthorsService } from './authors.service';
import { Author } from '../models/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  user;
  isAdmin = false;

  authors: Author[] = [];

  constructor(
    private authorService: AuthorsService,
    private router: Router,
    private toast: HotToastService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('profile'));
    if (this.user?.result.role === 'admin') {
      this.isAdmin = true;
    }
    this.spinner.show();
    this.fetchAuthors();
  }
  fetchAuthors() {
    this.authorService.getAuthors().subscribe((author) => {
      (this.authors = author), this.spinner.hide();
    });
  }
  fetchDataByName(idAuthor: string) {
    // this.router.navigate(['/books'], { queryParams: { author: nameAuthor } });
    console.log(idAuthor);
  }
  onDelete(id: string) {
    console.log(id);
    this.authorService
      .deleteAuthor(id)
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Delete Author Success',
          error: 'Something has wrong',
        })
      )
      .subscribe(() => {
        this.authors = this.authors.filter((author) => author._id !== id);
      });
  }
}
