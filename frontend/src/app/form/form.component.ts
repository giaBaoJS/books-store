import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books/books.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthorsService } from '../authors/authors.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isUpdate = false;
  id: string;
  successTemplate = 'Thêm thành công !';
  errorTemplate = 'Không thể thêm, đã xảy ra lỗi !';
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    image: new FormControl(''),
  });

  constructor(
    private bookService: BooksService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toast: HotToastService,
    private authorService: AuthorsService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id !== null) this.isUpdate = true;
  }

  ngOnInit(): void {
    if (this.isUpdate) this.getBookDetail();
    this.fetchAuthors();
    this.onValuechanged();
  }

  onValuechanged() {
    this.filteredOptions = this.bookForm.controls.author.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }
  fetchAuthors() {
    this.authorService
      .getAuthors()
      .pipe(
        map((authors: Author[]) =>
          authors.map((author) => this.options.push(author.name))
        )
      )
      .subscribe();
  }
  // fetchAuthors() {
  //   const exmample = this.authorService.getAuthors().pipe(
  //     map((authors: any) => {
  //       const authTemp = authors.map((author) => author.name);
  //       return authTemp;
  //     })
  //   );
  //   const subscribe = exmample.subscribe((val) => {
  //     this.options = val;
  //   });
  // }
  getBookDetail() {
    this.bookService.getBookDetail(this.id).subscribe((value) => {
      this.bookForm.patchValue(value);
    });
  }
  onSubmit(bookForm) {
    if (this.isUpdate) {
      this.successTemplate = 'Update thành công !';
      this.errorTemplate = 'Không thể update, đã xảy ra lỗi !';
      this.bookService
        .updateBook(this.id, bookForm)
        .pipe(
          this.toast.observe({
            loading: 'Saving...',
            success: this.successTemplate,
            error: this.errorTemplate,
          })
        )
        .subscribe(() => {
          this.router.navigateByUrl('/books');
        });
    } else {
      this.bookService.addBook(bookForm).subscribe(() => {
        this.router.navigateByUrl('/books');
      });
    }
  }
  clearData() {
    this.bookForm.reset();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
