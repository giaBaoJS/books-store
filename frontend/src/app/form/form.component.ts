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
  successTemplate = 'Add Book Success !';
  errorTemplate = "Can't add , something has wrong !";
  options: object[] = [];
  filteredOptions: Observable<string[]>;

  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    authorId: new FormControl('', Validators.required),
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

  async ngOnInit() {
    if (this.isUpdate) {
      this.getBookDetail();
    }

    const names = await this.fetchAuthors().toPromise();
    this.options.push(...names);
    console.log(this.options)
    this.onValuechanged();
  }

  onValuechanged() {
    this.filteredOptions = this.bookForm.controls.authorId.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }
  fetchAuthors() {
    return this.authorService.getAuthors().pipe(
      map((authors: Author[]) =>
        authors.map((author) => {
          return {
            name: author.name,
            _id: author._id,
          };
        })
      )
    );
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
      this.successTemplate = 'Update successfuly !';
      this.errorTemplate = "Can't update, something has wrong !";
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
  getOptionText(option) {
    
  }
}
