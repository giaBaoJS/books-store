import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books/books.service';
import { HotToastService } from '@ngneat/hot-toast';

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
    private toast: HotToastService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if (this.id !== null) this.isUpdate = true;
  }

  ngOnInit(): void {
    if (this.isUpdate) this.getBookDetail();
  }

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
}
